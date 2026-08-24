{
  fetchPnpmDeps,
  nodejs_24,
  pnpm_11,
  pnpmConfigHook,
  stdenv,
  lib,
}:
let
  nodejs = nodejs_24;
  pnpm = pnpm_11;
  version = "0.1.0";
  src = lib.fileset.toSource {
    root = ./.;
    fileset = ./.;
  };

  pnpmInstallFlags = [
    "--shamefully-hoist"
  ];

  pnpmDeps = fetchPnpmDeps {
    inherit
      version
      pnpm
      src
      pnpmInstallFlags
      ;

    pname = "glugg-dependencies";

    fetcherVersion = 4;
    sourceRoot = "${src.name}";
    hash = "sha256-djpAbC/ElbtD/2IYcbQwC64Yb3TlKZxojTU6RZFNhXE=";
    # hash = lib.fakeHash;
  };
in
{
  glugg-frontend = stdenv.mkDerivation (finalAttrs: {
    inherit
      version
      src
      pnpmInstallFlags
      pnpmDeps
      ;

    pname = "glugg-frontend";

    nativeBuildInputs = [
      nodejs
      pnpmConfigHook
      pnpm
    ];

    pnpmRoot = ".";

    pnpmWorkspaces = [ "@glugg/frontend..." ];

    preBuild = ''
      export pnpm_config_verify_deps_before_run=false
    '';

    buildPhase = ''
      runHook preBuild

      pnpm --filter=@glugg/frontend... build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p "$out"

      cp -r packages/frontend/out/. $out

      runHook postInstall
    '';

  });

  glugg-backend = stdenv.mkDerivation (finalAttrs: {
    inherit
      version
      src
      pnpmInstallFlags
      pnpmDeps
      ;

    pname = "glugg-backend";

    nativeBuildInputs = [
      nodejs
      pnpmConfigHook
      pnpm
    ];

    pnpmRoot = ".";

    pnpmWorkspaces = [ "@glugg/backend..." ];

    preBuild = ''
      export pnpm_config_verify_deps_before_run=false
    '';

    buildPhase = ''
      runHook preBuild

      pnpm --filter=@glugg/backend... build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p "$out"

      cp -r packages/backend/dist $out

      find . -type d -name node_modules -prune -exec rm -rf {} +

      pnpm install \
        --filter="@glugg/backend..." \
        --prod \
        --offline \
        --ignore-scripts \
        --shamefully-hoist \
        --frozen-lockfile
        
      cp -rL node_modules $out

      runHook postInstall
    '';
  });

}
