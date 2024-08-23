<template>
    <div class="admin-page container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Panel d'administration</h1>
  
      <div v-if="$auth.loggedIn">
        <p class="mb-4">Bienvenue, {{ $auth.user.name }} !</p>
  
        <button @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
          Déconnexion
        </button>
      </div>
  
      <div v-else>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button @click="login"
          class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
          Se connecter avec Google
        </button>
      </div>
  
      <div v-if="message" :class="['mt-4 p-4 rounded', messageClass]">
        {{ message }}
      </div>
  
      <div class="flex justify-center mt-8">
        <form @submit.prevent="addBlogArticle" class="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
          <div class="mb-4">
            <label for="blogTitle" class="block text-sm font-medium text-gray-700">Titre de l'article</label>
            <input type="text" id="blogTitle" v-model="newBlogArticle.title" placeholder="Entrez le titre de l'article"
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div class="mb-4">
            <label for="blogContent" class="block text-sm font-medium text-gray-700 mb-2">Contenu de l'article</label>
            <client-only>
              <div class="border border-gray-300 rounded-md">
                <div class="flex flex-wrap gap-2 p-2 border-b border-gray-300">
                  <button type="button" @click="toggleBold" :class="{ 'is-active': isActive('bold') }" class="editor-btn">
                    Gras
                  </button>
                  <button type="button" @click="toggleItalic" :class="{ 'is-active': isActive('italic') }" class="editor-btn">
                    Italique
                  </button>
                  <button type="button" @click="toggleHeading(2)" :class="{ 'is-active': isActive('heading', { level: 2 }) }" class="editor-btn">
                    H2
                  </button>
                  <button type="button" @click="toggleHeading(3)" :class="{ 'is-active': isActive('heading', { level: 3 }) }" class="editor-btn">
                    H3
                  </button>
                  <button type="button" @click="toggleBulletList" :class="{ 'is-active': isActive('bulletList') }" class="editor-btn">
                    Liste à puces
                  </button>
                  <button type="button" @click="toggleOrderedList" :class="{ 'is-active': isActive('orderedList') }" class="editor-btn">
                    Liste numérotée
                  </button>
                  <button type="button" @click="toggleBlockquote" :class="{ 'is-active': isActive('blockquote') }" class="editor-btn">
                    Citation
                  </button>
                  <button type="button" @click="setHorizontalRule" class="editor-btn">
                    Ligne horizontale
                  </button>
                </div>
                <editor-content :editor="editor" class="p-4" />
              </div>
            </client-only>
          </div>
          <div class="mb-4">
            <label for="blogImageInput" class="block text-sm font-medium text-gray-700">Upload image</label>
            <input type="file" id="blogImageInput" ref="imageLocalInput" accept="image/*"
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Ajouter l'article
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { Editor, EditorContent } from '@tiptap/vue-2'
  import StarterKit from '@tiptap/starter-kit'
  
  export default {
    layout: 'panel',
    auth: true,
  
    components: {
      EditorContent,
    },
  
    data() {
      return {
        editor: null,
        message: '',
        messageClass: '',
        newBlogArticle: {
          title: '',
          content: '',
          image: '',
        }
      }
    },
  
    mounted() {
      this.$nextTick(() => {
        this.initEditor()
      })
    },
  
    beforeDestroy() {
      if (this.editor) {
        this.editor.destroy()
      }
    },
  
    methods: {
      initEditor() {
        this.editor = new Editor({
          content: '',
          extensions: [
            StarterKit,
          ],
          onUpdate: ({ editor }) => {
            this.newBlogArticle.content = editor.getHTML()
          },
        })
      },
  
      async addBlogArticle() {
        if (!this.newBlogArticle.title || !this.newBlogArticle.content) {
          this.showMessage('Le titre et le contenu sont requis', 'error')
          return
        }
  
        const formData = new FormData()
        formData.append('title', this.newBlogArticle.title)
        formData.append('content', this.newBlogArticle.content)
        if (this.$refs.imageLocalInput.files[0]) {
          formData.append('image', this.$refs.imageLocalInput.files[0])
        }
        try {
          const response = await this.$axios.post('/api/blog/add', formData);
          console.log('L\'article a été ajouté avec succès:', response.data);
          this.newBlogArticle = { title: '', content: '', image: '' };
          if (this.editor) {
            this.editor.commands.setContent('');
          }
          this.$refs.imageLocalInput.value = '';
          this.showMessage('Article ajouté avec succès', 'success');
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'article:', error);
          this.showMessage('Erreur lors de l\'ajout de l\'article', 'error');
        }
      },
  
      showMessage(msg, type) {
        this.message = msg
        this.messageClass = type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        setTimeout(() => {
          this.message = ''
          this.messageClass = ''
        }, 3000)
      },
  
      login() {
        this.$auth.loginWith('authentik')
      },
  
      async logout() {
        try {
          await this.$auth.logout()
          this.$router.push('/')
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error)
        }
      },
  
      // Méthodes pour les commandes de l'éditeur Tiptap
      toggleBold() {
        this.editor?.chain().focus().toggleBold().run()
      },
      toggleItalic() {
        this.editor?.chain().focus().toggleItalic().run()
      },
      toggleHeading(level) {
        this.editor?.chain().focus().toggleHeading({ level }).run()
      },
      toggleBulletList() {
        this.editor?.chain().focus().toggleBulletList().run()
      },
      toggleOrderedList() {
        this.editor?.chain().focus().toggleOrderedList().run()
      },
      toggleBlockquote() {
        this.editor?.chain().focus().toggleBlockquote().run()
      },
      setHorizontalRule() {
        this.editor?.chain().focus().setHorizontalRule().run()
      },
      isActive(type, attrs = {}) {
        return this.editor?.isActive(type, attrs) ?? false
      }
    }
  }
  </script>
  
  <style>
  .editor-btn {
    @apply px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200;
  }
  .editor-btn.is-active {
    @apply bg-blue-500 text-white;
  }
  .ProseMirror {
    @apply min-h-[200px] outline-none;
  }
  .ProseMirror p {
    @apply mb-4;
  }
  .ProseMirror h2 {
    @apply text-2xl font-bold mb-4;
  }
  .ProseMirror h3 {
    @apply text-xl font-bold mb-3;
  }
  .ProseMirror ul, .ProseMirror ol {
    @apply ml-6 mb-4;
  }
  .ProseMirror blockquote {
    @apply border-l-4 border-gray-300 pl-4 italic;
  }
  .ProseMirror hr {
    @apply my-4 border-t border-gray-300;
  }
  </style>