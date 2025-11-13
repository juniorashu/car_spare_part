import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";
import "./AdminUpload.css";

const AdminUpload = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    mainFiles: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ Check admin authentication
  useEffect(() => {
    const verifyAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/admin/login";
        return;
      }

      const user = session.user;
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("id", user.id)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
        return;
      }

      setCheckingAuth(false);
    };

    verifyAdmin();
  }, []);

  if (checkingAuth) return <p>🔒 Checking admin permissions...</p>;

  // ✅ Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle main image selection
  const handleMainFileChange = (e) => {
    setProduct((prev) => ({ ...prev, mainFiles: Array.from(e.target.files) }));
  };

  // ✅ Upload product (main images only)
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { name, description, price, mainFiles } = product;

      if (!mainFiles.length) throw new Error("Please select product images");

      const imagePaths = [];
      const imageUrls = [];

      // Upload each image to Supabase Storage
      for (const file of mainFiles) {
        const filePath = `products/${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        imagePaths.push(filePath);
        imageUrls.push(publicData.publicUrl);
      }

      // ✅ Save product details in Supabase
      const { error: insertError } = await supabase.from("products").insert([
        {
          name,
          description,
          price,
          image_path: imagePaths,
          image_urls: imageUrls,
        },
      ]);

      if (insertError) throw insertError;

      setMessage("✅ Product uploaded successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        mainFiles: [],
      });
    } catch (error) {
      console.error(error.message);
      setMessage("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout admin
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>🛒 Admin Product Upload</h2>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Main Product Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMainFileChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminUpload;
