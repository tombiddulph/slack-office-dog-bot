module.exports = function(robot) {

  var _ = require('lodash');

  var excitedEmotes = [
    'wags tail',
    'pants',
    'uses puppy eyes'
  ];

  var map = [
    {
      listener: 'hear',
      response: 'send',
      pattern: 'speak|talk',
      message: ['Woof!', 'Arf'],
      specificity: 10
    },
    {
      listener: 'hear',
      response: 'send',
      pattern: 'good boy|good dog|good girl',
      message: '',
      specificity: 50
    },
    {
      listener: 'hear',
      response: 'send',
      pattern: 'play',
      message: ':tennis:',
      specificity: 10
    },
    {
      listener: 'hear',
      response: 'send',
      pattern: 'play dead',
      message: ':fearful:',
      specificity: 100
    },
    {
      listener: 'hear',
      response: 'send',
      pattern: 'high five',
      message: ':raised_hands:',
      specificity: 50
    },
    {
      listener: 'hear',
      response: 'reply',
      pattern: 'food|treat|walk',
      message: '%s? Yes please!',
      specificity: 40
    },
    {
      listener: 'respond',
      response: 'reply',
      pattern: 'nap',
      message: ':zzz:',
      specificity: 50
    },
    {
      listener: 'respond',
      response: 'reply',
      pattern: 'squirrel',
      message: 'https://i0.wp.com/www.peacock-panache.com/wp-content/uploads/2014/11/Squirrel.png',
      specificity: 10
    }
  ];

  var bestMatch = null;

  _.forEach(_.uniq(_.map(map, 'listener')), function(listener){
    robot[listener](/(.*)/i, function(res) {
    
      var post = res.match[1];
      var bestMatch = {};
      var message = '';

      _.forEach(_.filter(map, function(item){ return item.listener === listener; }), function(item){
        if (RegExp(item.pattern).test(post)) {
          if (item.specificity > _.toInteger(bestMatch.specificity)) {
            bestMatch = item;
          }
        }
      });

      if (!_.isEmpty(bestMatch)) {
        message = bestMatch.message;
        if (_.isArray(message)) {
          message = _.sample(message);
        }
        if (message.indexOf('%s') >= 0) {
          message = message.replace('%s', post.match(bestMatch.pattern)[0]);
        }
        return res[bestMatch.response](message);
      }

    });
  });

  return robot;
};