# ein

ein is 1) a super-smart animated character on the anime series Cowboy Bebob; 2) a real-life Australian Shepherd + part-time [Bocoup](bocoup) office greeter; and 3) a chat bot for slack built on the [Hubot][hubot] framework. It was initially generated by [generator-hubot][generator-hubot], and configured for deployment via [Heroku][heroku].

This README is mostly intended to document the bot for my colleagues and also to help me remember WTF I did (this is baby's first bot). Feel free to use ein as is for yourself - but probably go to the [Hubot docs](hubotdocs) if you want to build your own bot. 

[bocoup]: http://bocoup.com
[heroku]: http://www.heroku.com
[hubot]: http://hubot.github.com
[generator-hubot]: https://github.com/github/generator-hubot
[hubotdocs]: https://hubot.github.com/docs/

### Running ein Locally

You can start ein locally by running:

    % bin/hubot

You'll see some start up output and a prompt:

    [Sat Feb 28 2015 12:38:27 GMT+0000 (GMT)] INFO Using default redis on localhost:6379
    ein>

Then you can interact with ein by typing `ein help`.

    ein> ein help
    ein help - Displays all of the help commands that ein knows about.
    ein animate me <query> - The same thing as `image me`, except adds [snip]
    ...

The following plugins for ein will not behave as exepected unless you set your own [environment variables](#configuration):

* hubot-pearson-dictionary (must create api key) 

### Configuration

A few scripts (including some installed by default) require environment variables to be set as a simple form of configuration.

As mentioned above, ein has been configured to deploy to heroku. Since I'm using the free heroku/redis offerings, he "wakes up" at 7:00 EST and goes to sleep at midnight. If you're a fellow Bocouper and you want to make some ein upgrades, lmk and I'll add you as a collaborator.


### Scripting

Ein has a script for simple interactions: `scripts/einthedog.coffee`. There's a [Scripting Guide](scripting-docs) from github that's been helpful and a boatload of other scripts for common tasks on NPM.

[scripting-docs]: https://github.com/github/hubot/blob/master/docs/scripting.md

### external-scripts

Ein makes use of the following existing plugins via `npm` packages: 

    % npm search hubot-scripts panda
    NAME             DESCRIPTION                        AUTHOR DATE       VERSION KEYWORDS
    hubot-appearin makes appearin rooms for quick meetings =missu 2014-11-30 0.9.2   hubot hubot-scripts panda
    hubot-calculator
    hubot-diagnostics
    hubot-google
    hubot-google-images
    hubot-google-translate
    hubot-maps
    hubot-pearson-dictionary
    hubot-slack
    hubot-xkcd
    ...

This is the recommended way to add functionality to your hubot:

1. Use `npm install --save` to add the package to `package.json` and install it
2. Add the package name to `external-scripts.json` as a double quoted string

You can review `external-scripts.json` to see what is included by default.

##### Advanced Usage

It is also possible to define `external-scripts.json` as an object to
explicitly specify which scripts from a package should be included. The example
below, for example, will only activate two of the six available scripts inside
the `hubot-fun` plugin, but all four of those in `hubot-auto-deploy`.

```json
{
  "hubot-fun": [
    "crazy",
    "thanks"
  ],
  "hubot-auto-deploy": "*"
}
```

**Be aware that not all plugins support this usage and will typically fallback
to including all scripts.**

[npmjs]: https://www.npmjs.com

### hubot-scripts

Before hubot plugin packages were adopted, most plugins were held in the
[hubot-scripts][hubot-scripts] package. Some of these plugins have yet to be
migrated to their own packages. They can still be used but the setup is a bit
different.

To enable scripts from the hubot-scripts package, add the script name with
extension as a double quoted string to the `hubot-scripts.json` file in this
repo.

[hubot-scripts]: https://github.com/github/hubot-scripts

##  Persistence

If you are going to use the `hubot-redis-brain` package (strongly suggested),
you will need to add the Redis to Go addon on Heroku which requires a verified
account or you can create an account at [Redis to Go][redistogo] and manually
set the `REDISTOGO_URL` variable.

    % heroku config:add REDISTOGO_URL="..."

If you don't need any persistence feel free to remove the `hubot-redis-brain`
from `external-scripts.json` and you don't need to worry about redis at all.

[redistogo]: https://redistogo.com/

## Adapters

Adapters are the interface to the service you want your hubot to run on, such
as Campfire or IRC. There are a number of third party adapters that the
community have contributed. Check [Hubot Adapters][hubot-adapters] for the
available ones.

If you would like to run a non-Campfire or shell adapter you will need to add
the adapter package as a dependency to the `package.json` file in the
`dependencies` section.

Once you've added the dependency with `npm install --save` to install it you
can then run hubot with the adapter.

    % bin/hubot -a <adapter>

Where `<adapter>` is the name of your adapter without the `hubot-` prefix.

[hubot-adapters]: https://github.com/github/hubot/blob/master/docs/adapters.md

## Deployment

    % heroku create --stack cedar
    % git push heroku master

If your Heroku account has been verified you can run the following to enable
and add the Redis to Go addon to your app.

    % heroku addons:add redistogo:nano

If you run into any problems, checkout Heroku's [docs][heroku-node-docs].

You'll need to edit the `Procfile` to set the name of your hubot.

More detailed documentation can be found on the [deploying hubot onto
Heroku][deploy-heroku] wiki page.

### Deploying to UNIX or Windows

If you would like to deploy to either a UNIX operating system or Windows.
Please check out the [deploying hubot onto UNIX][deploy-unix] and [deploying
hubot onto Windows][deploy-windows] wiki pages.

[heroku-node-docs]: http://devcenter.heroku.com/articles/node-js
[deploy-heroku]: https://github.com/github/hubot/blob/master/docs/deploying/heroku.md
[deploy-unix]: https://github.com/github/hubot/blob/master/docs/deploying/unix.md
[deploy-windows]: https://github.com/github/hubot/blob/master/docs/deploying/unix.md

## Restart the bot

You may want to get comfortable with `heroku logs` and `heroku restart` if
you're having issues.
