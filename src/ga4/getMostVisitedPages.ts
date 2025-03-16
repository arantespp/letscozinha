import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { unstable_cache } from 'next/cache';

const REVALIDATE_1_DAY = 60 * 60 * 24;

const credentials = process.env.GOOGLE_SERVICE_KEY
  ? JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY || '{}', 'base64').toString(
        'ascii'
      )
    )
  : {};

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials,
});

const propertyId = process.env.GA4_PROPERTY_ID;

export async function getMostVisitedPages() {
  try {
    const getCachedResponse = unstable_cache(
      async () => {
        return analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [
            {
              startDate: '7daysAgo',
              endDate: 'today',
            },
          ],
          dimensions: [
            {
              name: 'unifiedPagePathScreen',
            },
          ],
          metrics: [
            {
              name: 'screenPageViews',
            },
          ],
          limit: 25,
        });
      },
      ['getMostVisitedPages'],
      {
        revalidate: REVALIDATE_1_DAY,
      }
    );

    const [response] = await getCachedResponse();

    return (
      response.rows
        ?.map((row) => ({
          path: row.dimensionValues?.[0].value,
          views: row.metricValues?.[0].value,
        }))
        .filter(
          (
            page
          ): page is {
            path: string;
            views: string;
          } => !!page.path
        ) || []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
