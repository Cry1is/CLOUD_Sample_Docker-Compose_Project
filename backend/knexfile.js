module.exports = {
    development: {
      client: 'mysql',
      debug: true,
      connection: {
        host : 'db-gui-group1.cpetysb55lk4.us-east-2.rds.amazonaws.com',
        port : 3306,
        user : 'admin',         // change to local user
        password : 'hRAd5KAnGXBkG5XeVE7G', // change to local password
        database : 'db'
      }
    }
  };