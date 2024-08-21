module.exports = {
    apps: [
      {
        name: 'my-nest-app', // Nom de votre application
        script: 'dist/main.js', // Point d'entrée de l'application
        instances: 'max', // Nombre d'instances à lancer (max utilise tous les cœurs disponibles)
        exec_mode: 'cluster', // Mode cluster pour bénéficier de plusieurs cœurs
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  