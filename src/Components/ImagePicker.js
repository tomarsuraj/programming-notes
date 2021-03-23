import React, { useContext, useState } from 'react'

// firebase
import firebase from 'firebase/app'
import { UserContext } from '../context/context'

import imageCompression from 'browser-image-compression'

const ImagePicker = ({ postId }) => {
  const { appState } = useContext(UserContext)

  const [uploadingStatus, setUploadingStatus] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const imagePickerFun = async (e) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const imageFile = e.target.files[0]

      const compressedFile = await imageCompression(imageFile, options)

      var metadata = {
        contentType: imageFile.type,
      }

      const storageRef = await firebase.storage().ref()
      var uploadTask = storageRef
        .child(appState.user.uid + '/' + postId + '/' + compressedFile.name)
        .put(compressedFile, metadata)

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadingStatus(progress)
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
            default:
              console.log('Upload ')
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              setUploadingStatus(
                "User doesn't have permission to access the object",
              )
              console.log("User doesn't have permission to access the object")
              break

            case 'storage/canceled':
              setUploadingStatus('User canceled the upload')

              console.log('User canceled the upload')
              break

            case 'storage/unknown':
              setUploadingStatus(
                'Unknown error occurred, inspect error.serverResponse',
              )

              console.log(
                'Unknown error occurred, inspect error.serverResponse',
              )
              break
            default:
              setUploadingStatus('Some Error Ocure')

              console.log('Some Error Ocure')
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageUrl(downloadURL)
          })
        },
      )
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div className="uploadImageContainer">
      <label>Choose File To Upload</label>
      <input
        type="file"
        name="image"
        id="imagepicker"
        accept="image/*"
        multiple={false}
        onChange={(e) => {
          imagePickerFun(e)
        }}
        className="hidden"
      />
      <p>Image Uploading Status: {uploadingStatus}</p>
      <p>Last Image url is:</p>
      <p>{imageUrl}</p>
    </div>
  )
}

export default ImagePicker
