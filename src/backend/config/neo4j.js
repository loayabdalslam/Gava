import neo4j from 'neo4j-driver';

class Neo4jConnection {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'neo4j'),
        {
          database: 'gava'
        }
      );
    }
    return this.instance;
  }

  static async close() {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
  }
}

export default Neo4jConnection; 