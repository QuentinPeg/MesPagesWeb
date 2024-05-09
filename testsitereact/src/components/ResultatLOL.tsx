import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

interface TableFromRemotePageProps {
  pageUrl: string;
}

const TableFromRemotePage: React.FC<TableFromRemotePageProps> = ({ pageUrl }) => {
  const [tableContent, setTableContent] = useState<string | null>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(pageUrl);
        const html = response.data;
        const $ = cheerio.load(html);
        const content = $('.wikitable2').html();
        setTableContent(content);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pageUrl]);

  return (
    <div>
      {tableContent ? (
        <div dangerouslySetInnerHTML={{ __html: tableContent }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TableFromRemotePage;
