import axios from "axios";

const CLOUD_NAME = "dji2zokvj";
const UPLOAD_PRESET = "museusAumentados";

export async function uploadImagemCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await axios.post(url, formData);
  return response.data.secure_url;
}
