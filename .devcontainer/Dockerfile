# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends curl make unzip xz-utils acl

ARG USER=vscode
ARG USER_ID=1000
ARG USER_GID=1000

VOLUME /nix

RUN mkdir -pm 0755 /nix && chown ${USER_ID}:${USER_GID} /nix
RUN mkdir -pm 0755 /home/${USER}/.vscode-server && chown ${USER_ID}:${USER_GID} /home/${USER}/.vscode-server
RUN update-locale LC_ALL=C

USER ${USER_ID}:${USER_GID}
ENV LC_ALL=C
RUN curl -L https://nixos.org/nix/install | sh
