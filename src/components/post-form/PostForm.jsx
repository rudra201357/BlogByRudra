
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service  from "../../appwrite/appWriteConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const title = useWatch({ control, name: "title" });
    const imageFiles = useWatch({ control, name: "image" });
    const selectedImage = imageFiles?.[0];
    const imagePreview = useMemo(
        () => selectedImage
            ? URL.createObjectURL(selectedImage)
            : post?.featuredImage ? service.getFilePreview(post.featuredImage) : "",
        [selectedImage, post]
    );

    useEffect(() => {
        if (!selectedImage) return undefined;

        return () => URL.revokeObjectURL(imagePreview);
    }, [imagePreview, selectedImage]);

    const submit = async (data) => {
        const image = data.image?.[0];

        if (post) {
            const file = image ? await service.uploadFile(image) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            if (!image || !userData) return;

            const file = await service.uploadFile(image);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        setValue("slug", slugTransform(title), { shouldValidate: true });
    }, [title, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
            <div className="min-w-0">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="min-w-0">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {imagePreview && (
                    <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <div className="border-b border-slate-200 px-4 py-3">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                                {selectedImage ? "New image preview" : "Current image"}
                            </p>
                        </div>
                        <img
                            src={imagePreview}
                            alt={selectedImage?.name || post?.title || "Featured image preview"}
                            className="aspect-4/3 w-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}