# Vike React on Cloudflare Pages by DaliCommerce
This repo is a basic implemention of Vike (with React) to run on Cloudflare Pages. Also included: Tailwind...and more coming soon... We think Vike + Cloudflare Pages provides the single best platform for web apps, and is superior to NextJs for various reasons. Please note that since Vike is an agnostic platform, if another UI framework, such as Vue, is more to your liking, you should be able to fork this repo and easily replace React with another UI framework. Please just consult the appropriate examples at Vike.

Why Vike? See their docs where they give powerful reasons why you might choose Vike.

Why Cloudflare Pages? It's the simplest platform to use, while offering access to a vast variety of additional incredible Cloudflare features, like Workers and KV.

## Development
The dev environment does not use any Cloudflare features and is simply a classic express server, that runs from from the Server directory. To run dev, you simply run the command `npm run dev`

## Going Live to Production on Cloudflare Pages!
1. Make sure you have a Cloudflare and Github account with Cloudflare given access to Github repos (i.e. in Github, go to Profile >Settings > Applications (left side) > Configure Cloudflare Oages ).
2. Fork this repo.
3. Give Cloudflare access to the new repo you created (see step 1)
4. Log into Cloudflare and follow the steps below:
- In Account Home, select Workers & Pages > Create application > Pages > Connect to Git.
- Select your new GitHub repository.
- In the Set up builds and deployments, set npm run build as the Build command, and dist/client as the Build output directory. **Important: The output directory must be dist/client**  (Note: For framework preset, just choose None)
- After completing configuration, select Save and Deploy.

## Styling
This repo comes with Tailwind installed. If you don't want Tailwind you can uninstall the following packages: tailwindcss postcss autoprefixer, and remove the import of tailwind in, as well as renderer/index.css.


## To Do
1. Cloudflare Bindings and Worker Functions (i.e. API Endpoings): Right now, when in development mode, you can't use KV or other Cloudflare Bindings with this repo, or test any additional api routes (these will all return 404 in development), because Wrangler is not installed. Honestly, Wrangler is difficult to work with locally for something like Vike, so for now we are just leaving this as a To Do. We believe you can just use the Miniflare package to achieve local development for Pages with access to Bindings, without using Wrangler, but we are not familiar with Miniflare as a standalone package. This is an area for investigation.

Update: We have installed Miniflare on this repo and started the integration. You can now mock Cloudflare KV with this repo on dev.

2. Add Itty Router and then error for APIs and front end
3. Protect API routes