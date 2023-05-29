# GlabENV

CLI to export and synchronize Gitlab environment variables

![Demo](img/demo.gif)

## How To Install 🚀

Via NPM:

```bash
npm install -g glabenv
```

Via Yarn:

```bash
yarn global add glabenv
```

## Gitlab Authentication 🔐

Set the GitLab access token with the `--token` or `-t` option:

```bash
glabenv [COMMAND] --token <YOUR_GITLAB_ACCESS_TOKEN>
```

Alternatively, you can use an environment variable:

```bash
export GLABENV_ACCESS_TOKEN=<YOUR_GITLAB_ACCESS_TOKEN>
```

## Commands 🛠️

### Export

To export all environment variables from a GitLab repository, you need to set the repository URL with the `--repoURL` or `-r` option:

```bash
glabenv export -r <YOUR_GITLAB_REPO_URL>
# Output :
# DATABASE_HOST=localhost
# DATABASE_USER=dbuser
# ...
```

You can also set the repository URL as an environment variable:

```bash
export GLABENV_REPOSITORY=<YOUR_GITLAB_REPO_URL>
glabenv export
# Output :
# DATABASE_HOST=localhost
# DATABASE_USER=dbuser
# ...
```

You can write the output to a file with `--output` or `-o` option:

```bash
glabenv export -o env.example
cat env.example
# Output :
# DATABASE_HOST=localhost
# DATABASE_USER=dbuser
# DATABASE_PASS=pass1234
# DATABASE_NAME=example_db
```

You can get the output as JSON format with the `--format` or `-f` option. The default format is `env`:

```bash
glabenv export -f json
# Output :
#[{"variable_type":"env_var","key":"DATABASE_HOST","value":"localhost","protected":false,"masked":false...
```

If you want the JSON output in a pretty format, use the `--pretty` option:

```bash
glabenv export -f json --pretty
# Output :
# [
#   {
#     "variable_type": "env_var",
#     "key": "DATABASE_HOST",
#     "value": "localhost",
#     "protected": false,
#     "masked": false,
#     "raw": false,
#     "environment_scope": "*"
#   },
# ...
```

### Sync

To synchronize environment variables from your local env file to a GitLab repository:

```bash
glabenv sync --filepath env.example
```

Synchronization behavior:

- Create a new variable if there is a key in the local env file that doesn't exist in GitLab env variables.
- Update the variable if the value of the key in the local env file doesn't match the one in GitLab env variables.
- Delete the variable if there is a key in GitLab env variables that doesn't exist in the local env file.

You can see the output of this command on the demo gif above

## Export and Sync Gitlab Group Env Variables 👥

You can export or synchronize Gitlab group environment variables by set the repository URL with your Gitlab group URL and add `-l` or `--level` option with value: `group`.

Example for `export` command:

```
glabenv export -r https://gitlab.example.com/demo-group/demo-subgroup --level group
```

Example for `sync` command:

```
glabenv sync --filepath env.example -r https://gitlab.example.com/demo-group/demo-subgroup --level group
```

Alternatively, you can use environment variables:

```bash
export GLABENV_REPOSITORY=https://gitlab.example.com/demo-group/demo-subgroup
export GLABENV_LEVEL=group
```

## Export and Sync Gitlab Instance Env Variables 👨🏻‍💼

You can export or synchronize Gitlab instance environment variables by set the repository URL with your Gitlab host URL and add `-l` or `--level` option with value: `instance`.

Example for `export` command:

```
glabenv export -r https://gitlab.example.com --level instance
```

Example for `sync` command:

```
glabenv sync --filepath env.example -r https://gitlab.example.com --level instance
```

Alternatively, you can use environment variables:

```bash
export GLABENV_REPOSITORY=https://gitlab.example.com
export GLABENV_LEVEL=instance
```

## References 📝

- https://docs.gitlab.com/ee/api/project_level_variables.html
- https://docs.gitlab.com/ee/api/group_level_variables.html
- https://docs.gitlab.com/ee/api/instance_level_ci_variables.html
