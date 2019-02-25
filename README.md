Following the guide from: [https://aurelia.io/docs/tutorials](https://aurelia.io/docs/tutorials)

- Doing the TypeScript approach.

### Issues
- documentation says its okay to use `*.js` extension to write the /src scripts but actually if you choose TypeScript approach you'll have to use `.ts` extension
- also, simply loading index.html to browser won't work, you'll hit CORS policy, better choose webservers like PHP's `php -s localhost:8888`
- the web component's file, i.e. `app.html` should also reside inside /src folder same folder as its module `app.js`

### Apps
- [Todo App](https://aurelia.io/docs/tutorials/creating-a-todo-app) => [/todo-app](todo-app)
- [Contact Manager Tutorial](https://aurelia.io/docs/tutorials/creating-a-contact-manager) => [/contact-manager](contact-manager)