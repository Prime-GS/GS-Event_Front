const ACCEPTED_FILES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
}

const ACCEPTED_IMAGES = {
  'image/*': ['.png', '.jpg', '.jpeg'],
}

export function getAcceptByType(type?: 'file' | 'image') {
  let accept = {}

  if ('file' === type) {
    accept = ACCEPTED_FILES
  } else if ('image' === type) {
    accept = ACCEPTED_IMAGES
  } else {
    accept = { ...ACCEPTED_FILES, ...ACCEPTED_IMAGES }
  }

  return accept
}
