export function compressImage(file: File, max?: number): Promise<File> {
  const canvas = document.createElement('canvas')
  const img = document.createElement('img')
  const url = URL.createObjectURL(file)

  return new Promise((resolve, reject) => {
    img.onload = function () {
      let { width, height } = img
      const maxHeight = max || 1024
      const maxWidth = max || 1024

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width))
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height))
          height = maxHeight
        }
      }
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)

      if (file.type === 'image/jpeg') {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name))
            } else {
              reject()
            }
          },
          'image/jpeg',
          0.7
        )
      } else {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name))
          } else {
            reject()
          }
        }, file.type)
      }
    }

    img.onerror = function (err) {
      reject(err)
    }

    img.src = url
  })
}
