import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";
import "./AdminUpload.css";

const AdminUpload = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    files: [], // ✅ store multiple files
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

  // ✅ Handle text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // ✅ Handle multiple files
  const handleFileChange = (e) => {
    setProduct({ ...product, files: Array.from(e.target.files) });
  };

  // ✅ Upload product with multiple images
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { name, description, price, files } = product;
      if (!files.length) throw new Error("Please select at least one image");

      const uploadedPaths = [];
      const uploadedUrls = [];

      for (const file of files) {
        const filePath = `products/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        uploadedPaths.push(filePath);
        uploadedUrls.push(publicData.publicUrl);
      }

      // ✅ Insert product into Supabase
      const { error: insertError } = await supabase.from("products").insert([
        {
          name,
          description,
          price,
          image_path: uploadedPaths,
          image_url: uploadedUrls, // store array of URLs
        },
      ]);

      if (insertError) throw insertError;

      setMessage("✅ Product uploaded successfully!");
      setProduct({ name: "", description: "", price: "", files: [] });
    } catch (error) {
      console.error(error.message);
      setMessage("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
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

        {/* ✅ Multiple file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
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
