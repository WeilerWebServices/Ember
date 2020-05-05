import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' }, function() {
    this.route('about');
  });
  this.route('item');
  this.route('defaultlayout');
  this.route('link-to');
  this.route('profile', { path: '/profile/:id' });
});

export default Router;
