# talentlabs-practicum

## Requirements
1. Bash
2. Docker

## Instructions
1. Clone repository and change to `contact-manager-backend` branch.
    ```bash
    git clone https://github.com/hnnazm/talentlabs-practicum.git

    cd talentlabs-praticum

    git switch contact-manager-backend
    ```
2. Rename `.env.example` file to `.env` and **fill the variables**.
3. Run container.
    ``` bash
    docker compose --env-file .env up -d

    docker compose logs -f
    ```
4. Open `.curl` directory and run the shell script e.g.
    ``` bash
    # register user

    cd .curl/user/

    bash ./create
    ```
5. Clean up environment after done.
    ```bash
    docker compose --env-file .env down -v
    ```

## Additional Information

### API Server
- Can be accessed on http://127.0.0.1:3000 after running the containers.

### MongoDB Admin Panel (mongo-express)
- Can be accessed on http://127.0.0.1:8081 after running the containers.
- Default credentials:
    ```
    username: admin
    password: pass
    ```
