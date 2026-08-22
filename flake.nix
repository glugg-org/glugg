{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-compat = {
      url = "https://git.lix.systems/lix-project/flake-compat/archive/main.tar.gz";
      flake = false;
    };
  };
  outputs =
    {
      nixpkgs,
      ...
    }:
    let
      inherit (nixpkgs) lib;

      supportedSystems = [
        "x86_64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      forAllSystems = lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        rec {
          inherit (pkgs.callPackage ./packages.nix { }) glugg-frontend glugg-backend;

          glugg-backend-container = pkgs.dockerTools.buildImage {
            name = "glugg-backend-container";
            tag = glugg-backend.version;
            copyToRoot = [
              pkgs.nodejs-slim_24
              glugg-backend
            ];
            config = {
              Cmd = [
                "${pkgs.nodejs-slim_24}/bin/node"
                "${glugg-backend}/dist/main.js"
              ];
            };
          };

        }
      );

      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          nativeBuildInputs = with pkgs; [ ];
          buildInputs = with pkgs; [
            dive
            nodejs_24
            pnpm_11
            (python314.withPackages (pythonPackages: with pythonPackages; [ locust ]))
          ];
        in
        {
          default = pkgs.mkShellNoCC {
            inherit nativeBuildInputs buildInputs;
            allowSubstitutes = false;
          };
        }
      );
    };
}
