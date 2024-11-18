import neo4j from 'neo4j-driver';

class Neo4jConnection {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
      const user = process.env.NEO4J_USER || 'neo4j';
      const password = process.env.NEO4J_PASSWORD || '123456789';
      const database = process.env.NEO4J_DATABASE || 'gava';

      this.instance = neo4j.driver(uri, neo4j.auth.basic(user, password), {
        maxConnectionLifetime: 3 * 60 * 60 * 1000,
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 2000,
        database
      });
    }
    return this.instance;
  }

  static getSession() {
    const driver = this.getInstance();
    return driver.session({ database: 'gava' });
  }

  static async verifyConnectivity() {
    const driver = this.getInstance();
    try {
      await driver.verifyConnectivity();
      console.log('Connected to Neo4j successfully!');
      
      const session = this.getSession();
      try {
        await session.run('RETURN 1');
        console.log('Successfully connected to database: gava');
        return true;
      } finally {
        await session.close();
      }
    } catch (error) {
      console.error('Failed to connect to Neo4j:', error);
      return false;
    }
  }

  static async close() {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
  }
}

export default Neo4jConnection; 