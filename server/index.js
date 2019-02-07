import express from 'express';
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App, { routes } from './App';

// setup variables
const server = express();

// add the serverside render middleware
server.use(async (req, res, next) => {
    const foundRoute = routes.find(route => matchPath(req.path, route));

    if (foundRoute) {
        const initialProps = foundRoute.fetchData !== undefined
            ? await foundRoute.fetchData()
            : null;
        const context = { initialProps };
        // Streaming!! :D
        // const stream = renderToNodeStream(
        //     <StaticRouter location={req.path} context={context}>
        //          <App />
        //      </StaticRouter>
        // );
        // stream.pipe(res);
        // Blocking :((
        const render = renderToString(
            <StaticRouter location={req.path} context={context}>
                <App />
            </StaticRouter>
        )
        if (context.url) {
            res.redirect(context.url);
        } else {
            res.send(render);
        }
    } else {
        next();
    }
});

// start the server
server.listen(3000, () => {
    console.log('server running: http://localhost:3000');
});
