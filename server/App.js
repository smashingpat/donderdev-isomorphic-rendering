import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

export const routes = [
    {
        path:"/",
        exact: true,
        component: () => <h1>home</h1>,
    },
    {
        path:"/about",
        exact: true,
        component: () => <h1>about</h1>,
    },
    {
        path:"/post/:id",
        exact: true,
        component: (props) => {
            const data = props.staticContext.initialProps;
            if (data) {
                return (
                    <>
                        <h1>{data.species}</h1>
                        <ul>
                            {data.hobbies.map(hobby => (
                                <li key={hobby}>{hobby}</li>
                            ))}
                        </ul>
                    </>
                )
            }
            return <Redirect to="/" />;
        },
        async fetchData() {
            if (Math.random() > 0.5) {
                return {
                    species: 'grizzly',
                    hobbies: [
                        'fishing',
                        'sleeping',
                        'writing a memoize function',
                    ]
                }
            }

            return null;
        }
    },
]

export default function App() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        {routes.map(route => (
                            <li key={route.path}>
                                <Link to={route.path}>{route.path}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            <main>
                <h1>my awesome site</h1>
                <Switch>
                    {routes.map(route => (
                        <Route key={route.path} {...route} />
                    ))}
                    <Redirect to="/" />
                </Switch>
            </main>
        </>
    )
}
