import React, { useState, useContext } from 'react'
import { Container, Button, Form, Image } from 'react-bootstrap'
import firebase, { auth, firestore } from 'firebase/app'
import { toast } from 'react-toastify'
import imageCompression from 'browser-image-compression'

// To Redirect Page
import { Redirect } from 'react-router-dom'
import { UserContext } from '../context/context'

const SignUp = () => {
  const { appState } = useContext(UserContext)

  const [email, setEmail] = useState('@gmail.com')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [imagePick, setImagePick] = useState(null)
  const [previewImage, setPreviewImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/notes-programming.appspot.com/o/Default%20Profiole%20pic.jpg?alt=media&token=5b752049-7083-4911-8f7b-8bb0874c22d3',
  )

  const uploadProfilePic = async ({ uid }) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imagePick, options)

      var metadata = {
        contentType: imagePick.type,
      }

      const storageRef = await firebase.storage().ref()
      var uploadTask = storageRef
        .child(uid + '/profilePic')
        .put(compressedFile, metadata)

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
              toast.info("User doesn't have permission to access the object", {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              console.log("User doesn't have permission to access the object")
              break

            case 'storage/canceled':
              toast.info('User canceled the upload', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })

              console.log('User canceled the upload')
              break

            case 'storage/unknown':
              toast.info(
                "'Unknown error occurred, inspect error.serverResponse",
                {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                },
              )

              console.log(
                'Unknown error occurred, inspect error.serverResponse',
              )
              break
            default:
              toast.info('Some Error Ocure during Uploding Profile Pic', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })

              console.log('Some Error Ocure')
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            toast.info('Profile Pic Uploded', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })

            firestore()
              .collection('Users')
              .doc(uid)
              .update({
                profilePicUrl: downloadURL,
              })
              .then(() => {
                toast('Sign Up successfully', {
                  type: 'success',
                })
              })
          })
        },
      )
    } catch (error) {
      toast(error.message, {
        type: 'error',
      })
    }
  }

  const handleSignUp = async () => {
    console.log('Hande Sign Up Calle')

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log('Data', data.user.uid)

        firestore()
          .collection('Users')
          .doc(data.user.uid)
          .set({
            name,
            email,
            bio,
            uid: data.user.uid,
          })
          .then(() => {
            toast('Sign Up successfully', {
              type: 'success',
            })
          })
        uploadProfilePic({ uid: data.user.uid })
      })

      .catch((error) => {
        toast(error.message, {
          type: 'error',
        })
      })
  }

  const imagePicker = async (e) => {
    setImagePick(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  // if (appState.isAuthenticated) {
  //   return <Redirect to="/" />;
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignUp()
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <Form.Group>
          <Image
            src={previewImage}
            width="50"
            height="50"
            roundedCircle
            className="mb-2"
            alt="no image"
          />

          <Form.File
            name="image"
            accept="image/*"
            multiple={false}
            onChange={(e) => imagePicker(e)}
            id="imagepicker"
            label="Profile file input"
            lang="en"
            custom
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            value={bio}
            type="text"
            placeholder="Enter Bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp
