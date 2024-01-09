# Vike React on Cloudflare Pages by DaliCommerce
This repo is a basic implemention of Vike (with React) to run on Cloudflare Pages. Also included: Tailwind...and more coming soon...like ecommerce. Note: This is a work in progress. 

We think Vike + Cloudflare Pages provides the single best platform for web apps, and is superior to NextJs for various reasons. Please note that since Vike is an agnostic platform, if another UI framework, such as Vue, is more to your liking, you should be able to fork this repo and easily replace React with another UI framework. Please just consult the appropriate examples at Vike.

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
5. Important: Make sure you create a KV Namespace for this page in Cloudflare called: POST_STORE. This Repo will NOT work automatically without a KV Namespace. See below.

## KV Storage
For demonstration purposes this repo uses KV Storage on Cloudflare Pages to show some posts. Create a KV Namespace in Pages, by going to Settings > Functions > KV namespace bindings and name it POST_STORE, and associate with the approriate KV Storage Namespace. If you do not want to use KV, simply comment out the KV call in _worker.js, line 63, and remove it from the pageContext. 

## Router
This repo comes installed with [Itty Router](https://itty.dev/itty-router). This just makes it easier to control many types of routes, like API routes, that may not be served by Vike. Please read the Itty Router docs to better understand the usage. We created a simple api endpoint in the worker, which is called by a React component to demonstrate how this could be used.

## Styling
This repo comes with Tailwind installed. If you don't want Tailwind you can uninstall the following packages: tailwindcss postcss autoprefixer, and remove the import of tailwind in, as well as renderer/index.css.


## To Do
1. Cloudflare Bindings and Worker Functions (i.e. API Endpoings): Right now, when in development mode, you can't use KV or other Cloudflare Bindings with this repo, or test any additional api routes (these will all return 404 in development), because Wrangler is not installed. Honestly, Wrangler is difficult to work with locally for something like Vite (although [Vite is working on first-class support for non Node.js environments such Cloudflare workers](https://github.com/vitejs/vite/discussions/14288)). We believe you can just use the Miniflare package to achieve local development for Pages with access to Bindings, without using Wrangler, but we are not familiar with Miniflare as a standalone package. This is an area for investigation.

Update: We have installed Miniflare on this repo and started the integration. You can now mock Cloudflare KV with this repo on dev.

2. Add Itty Router to Miniflare
3. Protect API routes
4. Catch collections/ and products/ blank, non-handle, routes. Right now going to products/ without a handle will cause an error 404 not found. Requires route functions. see: https://vike.dev/route-function and https://github.com/vikejs/vike/blob/main/examples/layouts-react/pages/starship/%2Broute.js
5. 404 for handles not found for categories and products, example if products/nonexist - product doesn't exist throw 404