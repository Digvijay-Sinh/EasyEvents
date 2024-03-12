import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { FaCameraRetro } from "react-icons/fa";

const MAX_IMAGE_SIZE_MB = 1; // Maximum image size allowed in MB
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png"]; // Supported image types

const schema = yup.object().shape({
  speakers: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Speaker Name is required"),
      bio: yup.string().required("Speaker Bio is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Speaker Email is required"),
      organization: yup.string().nullable(), // Assuming organization is optional
    })
  ),
});

type FormData = {
  speakers: Array<{
    name: string;
    bio: string;
    email: string;
    organization?: string | null;
  }>;
};

const AddEventForm22: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file);
    setImageError(null);

    if (file) {
      // Validate image type
      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        setImageError("Only JPEG and PNG images are supported.");
        return;
      }

      // Validate image size
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        setImageError(`Image size should be less than ${MAX_IMAGE_SIZE_MB}MB.`);
        return;
      }
    }
  };
  const { register, control, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      speakers: [
        {
          name: "",
          bio: "",
          email: "",
          organization: "",
        },
      ],
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    if (selectedImage) {
      // Handle form submission here
      console.log("Form submitted with image:", selectedImage);
    } else {
      setImageError("Please select an image.");
    }
    // Handle form submission
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    name: "speakers",
    control: control,
  });

  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedImage(event.target.files[0]);
  //   }
  // };
  const uploadSpeakerImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const imageUpload = await axios.post(
        "http://localhost:5000/api/v1/imageUpload/upload",
        formData
      );
      if (imageUpload.status === 200) {
        setSelectedImage(null);
        const fileInput = document.getElementById(
          "imageInput"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ""; // Clear the input value
        }
      }
      console.log("===========uploaded successfully===============");
      console.log(imageUpload.data);
      console.log("====================================");
    } else {
      setImageError("Please select an image.");
    }
  };

  return (
    <section className="bg-no-repeat bg-center bg-cover ">
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 "> */}
      <div className="w-full   shadow   md:mt-0 xl:p-0 bg-transparent">
        <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white mt-2">
            Add Speakers /Presenters /Performers
          </h1>
          <div>
            <div>
              <form
                className="space-y-4 md:space-y-6"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  {fields.map((field, index) => {
                    return (
                      <>
                        <div className="sm:flex w-full">
                          <div className="sm:w-1/2 m-4">
                            <div>
                              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                                Speaker no. {index + 1}
                              </h1>
                            </div>
                            <div>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker name
                              </label>
                              <input
                                type="text"
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                key={index}
                                {...register(`speakers.${index}.name`)}
                              />
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker bio
                              </label>
                              <input
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                key={index}
                                {...register(`speakers.${index}.bio`)}
                              />
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker email
                              </label>
                              <input
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                key={index}
                                {...register(`speakers.${index}.email`)}
                              />
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker organization
                              </label>
                              <input
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                key={index}
                                {...register(`speakers.${index}.organization`)}
                              />
                            </div>
                          </div>
                          <div className="sm:w-1/2   m-4 sm:self-center sm:flex sm:flex-col sm:items-center  ">
                            <div className="sm:w-1/2">
                              <label className="block relative mb-2 text-sm font-medium text-white sm:flex sm:flex-col sm:items-center">
                                Speaker Image
                                <input
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  id="imageInput"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                                <div className="flex items-center justify-center sm:h-36 sm:w-36 border-2 border-dashed border-gray-600 rounded-lg">
                                  <FaCameraRetro className="text-5xl text-white" />
                                </div>
                              </label>
                            </div>
                            <Button onClick={uploadSpeakerImage}>
                              Upload Image
                            </Button>
                            <div className="mt-4">
                              {selectedImage && (
                                <img
                                  className="align-middle"
                                  src={URL.createObjectURL(selectedImage)}
                                  alt="Selected"
                                  style={{ width: "320px", height: "180px" }}
                                />
                              )}
                            </div>
                            {imageError && (
                              <div className="text-white">{imageError}</div>
                            )}
                          </div>
                        </div>
                        {index > 0 && (
                          <Button
                            className="mt-2"
                            type="button"
                            onClick={() => {
                              return remove(index);
                            }}
                          >
                            Remove speaker
                          </Button>
                        )}
                      </>
                    );
                  })}
                  <Button
                    className="mt-2"
                    type="button"
                    onClick={() => {
                      return append({
                        name: "",
                        bio: "",
                        email: "",
                        organization: "",
                      });
                    }}
                  >
                    Add new Speaker
                  </Button>
                </div>

                <div className="w-full flex justify-end ">
                  <Button className="m-4" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default AddEventForm22;
