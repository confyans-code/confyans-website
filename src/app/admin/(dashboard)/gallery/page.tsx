"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Trash2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
    const [images, setImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (selectedIndex === null) return;

            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
            if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, images.length]);

    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        try {
            const res = await fetch("/api/admin/gallery");
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            }
        } catch (error) {
            console.error("Failed to fetch images", error);
        }
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setMessage(null);

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("file", file);
        });

        try {
            const res = await fetch("/api/admin/gallery", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setMessage({ type: "success", text: `Successfully uploaded ${data.count} images` });
                fetchImages();
                if (fileInputRef.current) fileInputRef.current.value = "";
            } else {
                setMessage({ type: "error", text: "Failed to upload images" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setIsUploading(false);
        }
    }

    async function confirmDelete() {
        if (!deleteTarget) return;

        setIsDeleting(true);
        try {
            const res = await fetch("/api/admin/gallery", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: deleteTarget }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Image deleted successfully" });
                fetchImages();
            } else {
                setMessage({ type: "error", text: "Failed to delete image" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setIsDeleting(false);
            setDeleteTarget(null);
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400">
                Upload and manage images for your website.
            </p>

            {message && (
                <div className={`rounded-md p-4 text-sm ${message.type === "success"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="flex items-center gap-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className={`
                        flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 
                        ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                >
                    {isUploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Upload className="h-4 w-4" />}
                    {isUploading ? "Uploading..." : "Upload Images"}
                </label>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.map((image, index) => (
                    <div
                        key={image}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-800 cursor-pointer"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <Image
                            src={`/gallery/${image}`}
                            alt={image}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setDeleteTarget(image);
                            }}
                            className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 shadow-sm transition-opacity hover:bg-red-700 group-hover:opacity-100"
                            title="Delete Image"
                        >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            {images.length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                    <ImageIcon className="h-10 w-10 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No images yet. Upload one to get started.</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">Delete Image?</h3>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to delete this image? This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                disabled={isDeleting}
                                className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50"
                            >
                                {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Lightbox */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
                        }}
                        className="absolute left-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
                        }}
                        className="absolute right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>

                    {/* Main Image */}
                    <div
                        className="relative h-full w-full p-12 flex items-center justify-center"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <div
                            className="relative h-full w-full max-h-[90vh] max-w-[90vw]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={`/gallery/${images[selectedIndex]}`}
                                alt={images[selectedIndex]}
                                fill
                                className="object-contain"
                                priority
                                sizes="90vw"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
