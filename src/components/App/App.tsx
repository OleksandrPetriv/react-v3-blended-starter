import Section from "../Section/Section";
import Container from "../Container/Container";
// import { useEffect } from "react";
import { getPhotos } from "../../services/photos";
import Form from "../Form/Form";
import { useState } from "react";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import toast, { Toaster } from "react-hot-toast";
import type { Photo } from "../../types/photo";
import { PacmanLoader } from "react-spinners";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isLoading, SetIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  // useEffect(() => {
  //   const getResponse = async () => {
  //     const response = await getPhotos("cat")
  //     console.log(response);
  //   }
  //   getResponse();
  // }, [])
  const handleSubmit = async (value: string) => {
    SetIsLoading(true);
    try {
      const response = await getPhotos(value)
      setPhotos(response);
      if (response.length === 0) {
        toast.error("Try another query")
        setPhotos(null);
        return;
      }
      setPhotos(response);
      
    }
    catch (error) {
      console.error(error);
    }
    finally {
      SetIsLoading(false);
    }
  };
  const handleClose = () => {
    setSelectedPhoto(null);
  }
  const handelPhotoClick = (photo: Photo)=> {
    setSelectedPhoto(photo);
  }
  return (
    <>
      <Section>
        <Container>
          <Toaster/>
          <Form onSubmit={handleSubmit} />
          {isLoading && <PacmanLoader/>}
          {photos && photos.length > 0 && <PhotosGallery photos={photos} onPhotoClick={ handelPhotoClick} />}
          {selectedPhoto && <Modal onClose={handleClose}>
            <img src={selectedPhoto.src.large} alt={selectedPhoto.alt}></img>
          </Modal>}
        </Container>
        Home page
      </Section>
    </>
  );
}
