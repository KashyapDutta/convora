interface TrendData {
  source: string;
  title: string;
  description: string;
  url: string;
  timestamp: string;
}

export class TrendService {
  private static async fetchRedditTrends(): Promise<TrendData[]> {
    try {
      const response = await fetch('https://www.reddit.com/r/web_design/hot.json');
      const data = await response.json();
      return data.data.children.slice(0, 5).map((post: any) => ({
        source: 'Reddit',
        title: post.data.title,
        description: post.data.selftext.slice(0, 200),
        url: `https://reddit.com${post.data.permalink}`,
        timestamp: new Date(post.data.created * 1000).toISOString()
      }));
    } catch (error) {
      console.error('Error fetching Reddit trends:', error);
      return [];
    }
  }

  private static async fetchGithubTrends(): Promise<TrendData[]> {
    try {
      const response = await fetch('https://api.github.com/search/repositories?q=topic:design&sort=stars&order=desc');
      const data = await response.json();
      return data.items.slice(0, 5).map((repo: any) => ({
        source: 'GitHub',
        title: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        timestamp: repo.created_at
      }));
    } catch (error) {
      console.error('Error fetching GitHub trends:', error);
      return [];
    }
  }

  static async getAllTrends(): Promise<{ success: boolean; data?: TrendData[]; error?: string }> {
    try {
      const [redditTrends, githubTrends] = await Promise.all([
        this.fetchRedditTrends(),
        this.fetchGithubTrends()
      ]);

      const allTrends = [...redditTrends, ...githubTrends].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      return {
        success: true,
        data: allTrends
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch trends'
      };
    }
  }
}