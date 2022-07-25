import { useState, useEffect, FormEvent } from 'react'
import * as C from './App.styles'
import * as Photos from './services/photos'
import { Photo } from './types/Photo'
import PhotoItem from './components/PhotoItem'

const App = () => {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    getPhotos()
  }, [])

  const getPhotos = async () => {
    setLoading(true)
    setPhotos(await Photos.getAll())
    setLoading(false)
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File
    if (file && file.size > 0) {
      setUploading(true)
      let result = await Photos.insert(file)
      setUploading(false)

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message} `)
      } else {
        let newPhotoList = [...photos]
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }
  }

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    getPhotos();
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>

        {/* Área de upload */}
        <C.UploadForm onSubmit={handleFormSubmit}>
          <input type="file" name='image' />
          <input type="submit" name='enviar' />
          {uploading && 'Enviando...'}
        </C.UploadForm>

        {/* Listagem de fotos*/}
        {loading &&
          <C.ScreenWarning>
            <span className="emoji">🖐</span>
            <p className='loading'>carregando...</p>
          </C.ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <C.PhotoList>
            {
              photos.map((item, index) => (
                <PhotoItem
                  key={index}
                  url={item.url}
                  name={item.name}
                  onDelete={handleDeleteClick}
                />
              ))
            }
          </C.PhotoList>
        }

        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <span className='emoji'>😞</span>
            <p className="loading">Não há fotos cadastradas.</p>
          </C.ScreenWarning>
        }

      </C.Area>
    </C.Container>
  )
}

export default App