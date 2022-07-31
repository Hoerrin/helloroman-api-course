import React, { useEffect, useState } from 'react';
import { Article, ArticleImage, Articles, Title, Wrapper } from 'components/SchoolNews/SchoolNews.styles';

const DATO_TOKEN = ''

const query = `
{ 
  allArticles { 
    title 
    content
    image {
      url 
      alt
    }
  } 
}`

const SchoolNews = () => {

  const [articles, setArticles] = useState()

  useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'Authorization': `Bearer ${DATO_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(({ data: { allArticles } }) => setArticles(allArticles))
      .catch(err => console.log(err))

  }, [])
  return (
    <Wrapper>
      <Title>Gazetka szkolna</Title>
      <Articles>
        {articles ? articles.map(article => (
          <Article key={article.title}>
            <ArticleImage>
              <img src={article.image.url} alt={article.image.alt} />
            </ArticleImage>
            <div>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          </Article>
        )) : (<h1>No articles</h1>)}
      </Articles>
    </Wrapper>
  )
};

SchoolNews.propTypes = {};

export default SchoolNews;
