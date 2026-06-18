"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  PenSquare, Trash2, Mail, ClipboardList, 
  FileText, Plus, RefreshCw, AlertCircle, Eye,
  Compass, LogOut, Clock, MapPin
} from "lucide-react";

interface Post {
  _id: string;
  slug: string;
  title: string;
  enTitle: string;
  category: string;
  date: string;
  image: string;
}

interface Tour {
  _id: string;
  slug: string;
  title: string;
  enTitle: string;
  price: string;
  duration: string;
  destination: string;
  image: string;
}

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  travelDate?: string;
  duration?: string;
  groupSize?: string;
  interests?: string;
  message?: string;
  createdAt: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Destination {
  _id: string;
  slug: string;
  title: string;
  enTitle: string;
  image: string;
}

type Tab = "destinations" | "tours" | "posts" | "inquiries" | "messages";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("destinations");
  const [posts, setPosts] = useState<Post[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteTourConfirm, setDeleteTourConfirm] = useState<string | null>(null);
  const [deleteDestConfirm, setDeleteDestConfirm] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [postsRes, toursRes, inquiriesRes, messagesRes, destRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/tours"),
        fetch("/api/inquiries"),
        fetch("/api/messages"),
        fetch("/api/destinations"),
      ]);
      const postsData = await postsRes.json();
      const toursData = await toursRes.json();
      const inquiriesData = await inquiriesRes.json();
      const messagesData = await messagesRes.json();
      const destData = await destRes.json();

      if (postsData.success) setPosts(postsData.data);
      if (toursData.success) setTours(toursData.data);
      if (inquiriesData.success) setInquiries(inquiriesData.data);
      if (messagesData.success) setMessages(messagesData.data);
      if (destData.success) setDestinations(destData.data);
    } catch (err) {
      setError("Failed to load data. Make sure MongoDB is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePost = async (slug: string) => {
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
        setDeleteConfirm(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to delete post.");
    }
  };

  const handleDeleteTour = async (slug: string) => {
    try {
      const res = await fetch(`/api/tours/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTours((prev) => prev.filter((t) => t.slug !== slug));
        setDeleteTourConfirm(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to delete tour package.");
    }
  };

  const handleDeleteDestination = async (slug: string) => {
    try {
      const res = await fetch(`/api/destinations/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDestinations((prev) => prev.filter((d) => d.slug !== slug));
        setDeleteDestConfirm(null);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to delete destination.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/hin-admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/hin-admin/login";
      }
    } catch (err) {
      setError("Failed to log out.");
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "destinations", label: "Destinations", icon: <MapPin className="w-4 h-4" />, count: destinations.length },
    { key: "tours", label: "Tour Packages", icon: <Compass className="w-4 h-4" />, count: tours.length },
    { key: "posts", label: "Blog Posts", icon: <FileText className="w-4 h-4" />, count: posts.length },
    { key: "inquiries", label: "Inquiries", icon: <ClipboardList className="w-4 h-4" />, count: inquiries.length },
    { key: "messages", label: "Messages", icon: <Mail className="w-4 h-4" />, count: messages.length },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      {/* Admin Header */}
      <div className="bg-[#2C2C2C] text-white py-6 px-6 md:px-12 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#A39E99] text-xs tracking-[0.3em] uppercase mb-1">Hinode Nepal</p>
            <h1 className="text-2xl font-light tracking-widest text-white">Content Management System</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 text-[#A39E99] hover:text-white transition-colors border border-[#4A4A4A] rounded-sm"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/hin-admin/destinations/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#A07855] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#8B6744] transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Destination
            </Link>
            <Link
              href="/hin-admin/tours/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Tour
            </Link>
            <Link
              href="/hin-admin/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#5A5A5A] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#727272] transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 border border-[#4A4A4A] text-[#A39E99] text-xs tracking-widest uppercase rounded-sm hover:border-white hover:text-white transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 border border-red-900/30 text-red-400 text-xs tracking-widest uppercase rounded-sm hover:bg-red-950/20 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {/* Error Banner */}
        {error && (
          <div className="mb-8 flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-sm text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Error</p>
              <p className="text-sm mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`p-6 rounded-sm text-left transition-all border ${
                activeTab === tab.key
                  ? "bg-white border-[#8B2C24] shadow-md"
                  : "bg-white border-[#E8E5DF] hover:border-[#2C2C2C] hover:shadow-sm"
              }`}
            >
              <div className={`mb-3 ${activeTab === tab.key ? "text-[#8B2C24]" : "text-[#5A5A5A]"}`}>
                {tab.icon}
              </div>
              <div className={`text-3xl font-light mb-1 ${activeTab === tab.key ? "text-[#8B2C24]" : "text-[#2C2C2C]"}`}>
                {tab.count}
              </div>
              <div className="text-xs tracking-widest uppercase text-[#5A5A5A]">{tab.label}</div>
            </button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D1CCC5] mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase transition-colors border-b-2 -mb-[1px] whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-[#8B2C24] text-[#8B2C24]"
                  : "border-transparent text-[#5A5A5A] hover:text-[#2C2C2C]"
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.key ? "bg-[#8B2C24] text-white" : "bg-[#E8E5DF] text-[#5A5A5A]"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#8B2C24] mb-4" />
            <p className="text-[#5A5A5A] tracking-wider uppercase text-sm">Loading data...</p>
          </div>
        )}

        {/* Destinations Tab */}
        {!loading && activeTab === "destinations" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-[#2C2C2C]">All Destinations ({destinations.length})</h2>
              <Link href="/hin-admin/destinations/new"
                className="flex items-center gap-2 px-4 py-2 bg-[#A07855] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#8B6744] transition-colors">
                <Plus className="w-3.5 h-3.5" /> New Destination
              </Link>
            </div>
            {destinations.length === 0 ? (
              <div className="bg-white rounded-sm border border-[#E8E5DF] p-16 text-center">
                <MapPin className="w-12 h-12 text-[#D1CCC5] mx-auto mb-4" />
                <p className="text-[#5A5A5A] mb-2">No destinations yet.</p>
                <p className="text-sm text-[#A39E99] mb-6">Create destinations first, then assign tours to them.</p>
                <Link href="/hin-admin/destinations/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#A07855] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#8B6744] transition-colors">
                  <Plus className="w-4 h-4" /> Create First Destination
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-sm border border-[#E8E5DF] overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8E5DF] bg-[#F4F1EC]">
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A]">Destination</th>
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A] hidden md:table-cell">Slug</th>
                      <th className="text-right py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((dest) => (
                      <tr key={dest._id} className="border-b border-[#E8E5DF] last:border-0 hover:bg-[#FAF9F6] transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-sm overflow-hidden shrink-0 hidden sm:block">
                              <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[#2C2C2C] font-medium text-sm mb-0.5">{dest.title}</p>
                              <p className="text-[#5A5A5A] text-xs">{dest.enTitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span className="text-[#A39E99] text-xs font-mono">/destinations/{dest.slug}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/destinations/${dest.slug}`} target="_blank"
                              className="p-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link href={`/hin-admin/destinations/edit/${dest.slug}`}
                              className="p-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors" title="Edit">
                              <PenSquare className="w-4 h-4" />
                            </Link>
                            {deleteDestConfirm === dest.slug ? (
                              <div className="flex items-center gap-2 ml-2">
                                <span className="text-xs text-[#5A5A5A]">Sure?</span>
                                <button onClick={() => handleDeleteDestination(dest.slug)}
                                  className="px-3 py-1 bg-red-600 text-white text-xs rounded-sm hover:bg-red-700">
                                  Yes
                                </button>
                                <button onClick={() => setDeleteDestConfirm(null)}
                                  className="px-3 py-1 bg-[#E8E5DF] text-[#2C2C2C] text-xs rounded-sm hover:bg-[#D1CCC5]">
                                  No
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => setDeleteDestConfirm(dest.slug)}
                                className="p-2 text-[#5A5A5A] hover:text-red-600 transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tours Tab */}
        {!loading && activeTab === "tours" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-[#2C2C2C]">All Tour Packages ({tours.length})</h2>
              <Link
                href="/hin-admin/tours/new"
                className="flex items-center gap-2 px-4 py-2 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                New Tour
              </Link>
            </div>
            {tours.length === 0 ? (
              <div className="bg-white rounded-sm border border-[#E8E5DF] p-16 text-center">
                <Compass className="w-12 h-12 text-[#D1CCC5] mx-auto mb-4" />
                <p className="text-[#5A5A5A] mb-2">No tour packages yet.</p>
                <p className="text-sm text-[#A39E99] mb-6">Create a new detailed tour package to display on your Luxury Tours journeys page.</p>
                <Link href="/hin-admin/tours/new" className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors">
                  <Plus className="w-4 h-4" />
                  Create First Tour
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-sm border border-[#E8E5DF] overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8E5DF] bg-[#F4F1EC]">
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A]">Tour Package</th>
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A] hidden md:table-cell">Details</th>
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A] hidden md:table-cell">Price</th>
                      <th className="text-right py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map((tour) => (
                      <tr key={tour._id} className="border-b border-[#E8E5DF] last:border-0 hover:bg-[#FAF9F6] transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-sm overflow-hidden shrink-0 hidden sm:block">
                              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[#2C2C2C] font-medium text-sm mb-0.5 line-clamp-1">{tour.title}</p>
                              <p className="text-[#5A5A5A] text-xs">{tour.enTitle}</p>
                              <p className="text-[#A39E99] text-xs mt-0.5 font-mono">/tours/{tour.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <div className="flex flex-col gap-1 text-xs text-[#5A5A5A]">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#A39E99]" /> {tour.destination}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#A39E99]" /> {tour.duration}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span className="text-[#8B2C24] font-medium text-sm">{tour.price}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/tours/${tour.slug}`}
                              className="p-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors"
                              title="View Tour"
                              target="_blank"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/hin-admin/tours/edit/${tour.slug}`}
                              className="p-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors"
                              title="Edit Tour"
                            >
                              <PenSquare className="w-4 h-4" />
                            </Link>
                            {deleteTourConfirm === tour.slug ? (
                              <div className="flex items-center gap-2 ml-2">
                                <span className="text-xs text-[#5A5A5A]">Sure?</span>
                                <button
                                  onClick={() => handleDeleteTour(tour.slug)}
                                  className="px-3 py-1 bg-red-600 text-white text-xs rounded-sm hover:bg-red-700 transition-colors"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteTourConfirm(null)}
                                  className="px-3 py-1 bg-[#E8E5DF] text-[#2C2C2C] text-xs rounded-sm hover:bg-[#D1CCC5] transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteTourConfirm(tour.slug)}
                                className="p-2 text-[#5A5A5A] hover:text-red-600 transition-colors"
                                title="Delete Tour"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Blog Posts Tab */}
        {!loading && activeTab === "posts" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-[#2C2C2C]">All Blog Posts ({posts.length})</h2>
              <Link
                href="/hin-admin/new"
                className="flex items-center gap-2 px-4 py-2 bg-[#2C2C2C] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#8B2C24] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                New Post
              </Link>
            </div>
            {posts.length === 0 ? (
              <div className="bg-white rounded-sm border border-[#E8E5DF] p-16 text-center">
                <FileText className="w-12 h-12 text-[#D1CCC5] mx-auto mb-4" />
                <p className="text-[#5A5A5A] mb-2">No blog posts yet.</p>
                <p className="text-sm text-[#A39E99] mb-6">Create a new blog post guide to share tips and guides with travelers.</p>
                <Link href="/hin-admin/new" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2C2C] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#8B2C24] transition-colors">
                  <Plus className="w-4 h-4" />
                  Create First Post
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-sm border border-[#E8E5DF] overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8E5DF] bg-[#F4F1EC]">
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A]">Post</th>
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A] hidden md:table-cell">Category</th>
                      <th className="text-left py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A] hidden md:table-cell">Date</th>
                      <th className="text-right py-3 px-6 text-xs tracking-widest uppercase text-[#5A5A5A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id} className="border-b border-[#E8E5DF] last:border-0 hover:bg-[#FAF9F6] transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-sm overflow-hidden shrink-0 hidden sm:block">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[#2C2C2C] font-medium text-sm mb-0.5 line-clamp-1">{post.title}</p>
                              <p className="text-[#5A5A5A] text-xs">{post.enTitle}</p>
                              <p className="text-[#A39E99] text-xs mt-0.5 font-mono">/blog/{post.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span className="px-3 py-1 bg-[#F4F1EC] text-[#5A5A5A] text-xs tracking-wider uppercase rounded-full">
                            {post.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span className="text-[#5A5A5A] text-sm">{post.date}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="p-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors"
                              title="View post"
                              target="_blank"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/hin-admin/edit/${post.slug}`}
                              className="p-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors"
                              title="Edit post"
                            >
                              <PenSquare className="w-4 h-4" />
                            </Link>
                            {deleteConfirm === post.slug ? (
                              <div className="flex items-center gap-2 ml-2">
                                <span className="text-xs text-[#5A5A5A]">Sure?</span>
                                <button
                                  onClick={() => handleDeletePost(post.slug)}
                                  className="px-3 py-1 bg-red-600 text-white text-xs rounded-sm hover:bg-red-700 transition-colors"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-3 py-1 bg-[#E8E5DF] text-[#2C2C2C] text-xs rounded-sm hover:bg-[#D1CCC5] transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(post.slug)}
                                className="p-2 text-[#5A5A5A] hover:text-red-600 transition-colors"
                                title="Delete post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {!loading && activeTab === "inquiries" && (
          <div>
            <h2 className="text-lg font-light text-[#2C2C2C] mb-6">Travel Inquiries ({inquiries.length})</h2>
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-sm border border-[#E8E5DF] p-16 text-center">
                <ClipboardList className="w-12 h-12 text-[#D1CCC5] mx-auto mb-4" />
                <p className="text-[#5A5A5A] mb-2">No inquiries yet.</p>
                <p className="text-sm text-[#A39E99]">Inquiries submitted via the /inquiry form will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry._id} className="bg-white rounded-sm border border-[#E8E5DF] p-6 hover:border-[#8B2C24] transition-colors shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-[#2C2C2C] font-medium text-base mb-1">{inquiry.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#5A5A5A]">
                          <span>📧 {inquiry.email}</span>
                          <span>📞 {inquiry.phone}</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#A39E99] shrink-0">
                        {new Date(inquiry.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#F4F1EC] rounded-sm p-4 mb-4">
                      {inquiry.travelDate && (
                        <div>
                          <p className="text-xs text-[#A39E99] uppercase tracking-wider mb-1">Travel Date</p>
                          <p className="text-sm text-[#2C2C2C]">{inquiry.travelDate}</p>
                        </div>
                      )}
                      {inquiry.duration && (
                        <div>
                          <p className="text-xs text-[#A39E99] uppercase tracking-wider mb-1">Duration</p>
                          <p className="text-sm text-[#2C2C2C]">{inquiry.duration}</p>
                        </div>
                      )}
                      {inquiry.groupSize && (
                        <div>
                          <p className="text-xs text-[#A39E99] uppercase tracking-wider mb-1">Group Size</p>
                          <p className="text-sm text-[#2C2C2C]">{inquiry.groupSize}</p>
                        </div>
                      )}
                      {inquiry.interests && (
                        <div>
                          <p className="text-xs text-[#A39E99] uppercase tracking-wider mb-1">Interests</p>
                          <p className="text-sm text-[#2C2C2C]">{inquiry.interests}</p>
                        </div>
                      )}
                    </div>
                    {inquiry.message && (
                      <p className="text-sm text-[#5A5A5A] font-light leading-relaxed border-t border-[#E8E5DF] pt-4">{inquiry.message}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {!loading && activeTab === "messages" && (
          <div>
            <h2 className="text-lg font-light text-[#2C2C2C] mb-6">Contact Messages ({messages.length})</h2>
            {messages.length === 0 ? (
              <div className="bg-white rounded-sm border border-[#E8E5DF] p-16 text-center">
                <Mail className="w-12 h-12 text-[#D1CCC5] mx-auto mb-4" />
                <p className="text-[#5A5A5A] mb-2">No messages yet.</p>
                <p className="text-sm text-[#A39E99]">Messages submitted via the /contact form will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg._id} className="bg-white rounded-sm border border-[#E8E5DF] p-6 hover:border-[#8B2C24] transition-colors shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-[#2C2C2C] font-medium text-base mb-0.5">{msg.subject}</h3>
                        <div className="flex gap-4 text-sm text-[#5A5A5A]">
                          <span>{msg.name}</span>
                          <span>·</span>
                          <span>{msg.email}</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#A39E99] shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-sm text-[#5A5A5A] font-light leading-relaxed bg-[#F4F1EC] rounded-sm p-4">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
