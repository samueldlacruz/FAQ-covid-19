import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../Header'
import FAQ from '../FAQ'
import { Faq } from '../FAQ/types'
import { getFAQs } from '../../services/FAQsServices'
import Footer from '../Footer'
import Filter from '../Filter'

const Container = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin: 2rem 0;
 padding: 1rem;

 main {
   width: 65vw;
 }

 @media screen and (max-width: 700px) {
  main {
    width: 100%;
  }
 }
`

const Wrapper: React.FunctionComponent = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  /**
   * this function get FAQ from service
   */
  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const listOfFaqs = await getFAQs();
      setFaqs(listOfFaqs);

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  /**
   * this function toggle accordion card
   * @param {number} index 
   */
  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.isOpen = !faq.isOpen
      } else {
        faq.isOpen = false;
      }

      return faq;
    }))
  }

  return (
    <>
      {loading ?
        <h1>loading ... </h1>
        :
        <Container>
          <Header />
          <main>
            <Filter />
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                index={index}
                faq={faq}
                toggleFAQ={toggleFAQ} />
            ))}
          </main>
          <Footer />
        </Container>
      }
    </>
  )
};

export default Wrapper