## Time Tracking Dashboard

A small dashboard built for a software engineering project at DHBW.
It provides analysis for issue-based time tracking, which GitLab itself does not natively offer.

> [!NOTE]  
> This project was developed in a short amount of time, so the code quality is not great.  
> It’s more a "it just works somehow" kind of project.

## Features

- 📊 **Project Overview**: Sprint metrics, velocity tracking, and category distribution
- 📈 **Time Series Charts**: Weekly performance trends and team activity comparison
- 🎯 **Team & Categories**: Pie charts and bar charts for time allocation analysis
- ⚡ **Productivity Analysis**: Hourly and weekly productivity patterns
- 👥 **Team Collaboration**: Network visualization of team collaboration
- 📋 **Issue Analysis**: Issue complexity and time analysis
- 📅 **Detailed Activity**: GitHub-style activity heatmap

## Demo

![Dashboard Demo](public/images/dashboard-demo.gif)

## Configuration (env variables)

This project now uses environment variables for configuration. Sensitive values (like the GitLab token) must be provided as server-side environment variables and are not embedded into client bundles.

Copy the example file and fill in your values:

```bash
cp .env.example .env
# then edit .env and set GITLAB_TOKEN
```

- GITLAB_TOKEN (required, server-side): your GitLab personal access token with `read_api` scope. Keep this secret.
- NEXT_PUBLIC_GITLAB_GROUP_PATH (optional): project/group path used for GraphQL queries (visible to client).
- NEXT_PUBLIC_GITLAB_API_URL / GITLAB_API_URL (optional): API endpoint if using a self-hosted GitLab.
- NEXT_PUBLIC_GITLAB_ISSUE_BASE_URL (optional): the public issue URL base used to create links.

There is a server-side API proxy at `POST /api/gitlab` that forwards GraphQL queries to GitLab using the server-side `GITLAB_TOKEN`. Client code calls this endpoint so the token is never sent to the browser.

Other non-secret settings, teams and categories are still configured in `config/dashboardConfig.ts`.

### Running with Docker Compose

Make sure you have copied `.env.example` to `.env` and set `GITLAB_TOKEN`.

Start the app with docker-compose:

```bash
docker compose up --build -d
```

The app will be available at http://localhost:3000. To stop it:

```bash
docker compose down
```

> [!WARNING]  
> Make sure your GitLab issues have labels that match these categories.

## Contributing

If you want to improve this projects, feel free to create a fork :)

## Support

If you need help with setting up the project (for instance the api key or adding the labels to the issues on gitlab), feel free to contact me on discord:
[cubepixels](https://discord.com/users/cubepixels)
