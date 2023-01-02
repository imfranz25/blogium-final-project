// It is best practise to organize your cloud functions group into their own file. You can then import them in your main.js.
/* Use custom parse functions */
require('./functions.js');
require('./routes/User')();
require('./routes/Blog')();
