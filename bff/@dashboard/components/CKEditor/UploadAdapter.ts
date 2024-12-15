import { useGalleryStore } from '@dashboard/stores/gallery.store'

class UploadAdapter {
  $GalleryStore
  constructor(private loader) {
    this.$GalleryStore = useGalleryStore()
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(async (file) => {
      const photo = await this.$GalleryStore.upload(file, 'photos/wysiwyg')
      return {
        default: photo.attributes.url
      }
    });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    // server.abortUpload();
  }
}

export class UploadAdapterPlugin {
  constructor(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }
}