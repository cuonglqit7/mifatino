export const uploadFileToCloudiary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  formData.append("cloud_name", "upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/defgbyoii/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );
  const result = await res.json();

  const url: string = result.secure_url;
  return url;
};
