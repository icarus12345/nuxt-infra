import { Plugin, ContextualBalloon, ButtonView, DropdownView, SplitButtonView, DropdownPanelView, ListView, ListItemView, icons, MenuBarMenuListItemButtonView } from 'ckeditor5';

export default class ExtendedImagePlugin extends Plugin {
  imageInsertUI
  $Dialog
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.$Dialog = useDialog()
  }

  afterInit() {
    this.imageInsertUI = this.editor.plugins.get('ImageInsertUI');
    this.imageInsertUI.registerIntegration({
        name: 'assetManager',
        observable: () => this.editor.commands.get('insertImage'),
        buttonViewCreator: () => this.createToolbarButton(),
        formViewCreator: () => this.createDropdownButton(),
        menuBarButtonViewCreator: isOnly => this.createMenuBarButton(isOnly ? 'insertOnly' : 'insertNested')
    });
  }

  createInsertUrlButton(ButtonClass) {
    const button = new ButtonClass(this.editor.locale);
    button.icon = icons.imageAssetManager;
    button.on('execute', () => {
      this.showModal()
    });
    return button;
}

  createToolbarButton() {
    const t = this.editor.locale.t;
    const button = this.createInsertUrlButton(ButtonView);
    button.tooltip = true;
    button.label = t('Insert via Gallery')
    return button;
  }

  createDropdownButton() {
    const t = this.editor.locale.t;
    const button = this.createInsertUrlButton(ButtonView);
    button.withText = true;
    button.label = t('Insert via Gallery')
    return button;
  }

  createMenuBarButton(type) {
    const t = this.editor.locale.t;
    const button = this.createInsertUrlButton(MenuBarMenuListItemButtonView);
    button.withText = true;
    switch (type) {
        case 'standalone':
            button.label = t('Image via Gallery');
            break;
        case 'insertOnly':
            button.label = t('Image');
            break;
        case 'insertNested':
            button.label = t('Via Gallery');
            break;
    }
    return button;
  }

  showModal() {
    const editor = this.editor;
    const GalleryDialog = defineAsyncComponent(() => import('@dashboard/components/Gallery/GalleryDialog.vue'))
    this.$Dialog.show({
      component: shallowRef(GalleryDialog),
      props: {
        content: {
          multiple: true
        }
      },
      callback(photos) {
        if (!photos?.length) return
        photos.forEach((photo, index) => {
          editor.model.change((writer) => {
            // editor.execute('insertImage', { source: photo })
            const selection = editor.model.document.selection;
            const insertPosition = selection.getFirstPosition();
    
            const imageElement = writer.createElement('imageBlock', { src: photo });
            editor.model.insertContent(imageElement, insertPosition);
            writer.setSelection(imageElement, 'after');
          })
        })
        
      }
    })
  }
}