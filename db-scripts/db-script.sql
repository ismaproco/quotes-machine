--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.5
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-04-08 09:56:09 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12723)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 177 (class 1259 OID 16486)
-- Name: keyword_id_seq; Type: SEQUENCE; Schema: public; Owner: ismapro
--

CREATE SEQUENCE keyword_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE keyword_id_seq OWNER TO ismapro;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 176 (class 1259 OID 16478)
-- Name: keywords; Type: TABLE; Schema: public; Owner: ismapro
--

CREATE TABLE keywords (
    keyword_id integer DEFAULT nextval('keyword_id_seq'::regclass) NOT NULL,
    keyword character varying(512),
    usage integer
);


ALTER TABLE keywords OWNER TO ismapro;

--
-- TOC entry 178 (class 1259 OID 16491)
-- Name: quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: ismapro
--

CREATE SEQUENCE quotes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE quotes_id_seq OWNER TO ismapro;

--
-- TOC entry 174 (class 1259 OID 16452)
-- Name: quotes; Type: TABLE; Schema: public; Owner: ismapro
--

CREATE TABLE quotes (
    quote_id bigint DEFAULT nextval('quotes_id_seq'::regclass) NOT NULL,
    title_id bigint,
    quote character varying(5000)
);


ALTER TABLE quotes OWNER TO ismapro;

--
-- TOC entry 175 (class 1259 OID 16460)
-- Name: sources; Type: TABLE; Schema: public; Owner: ismapro
--

CREATE SEQUENCE SOURCE_ID_SEQ;
SELECT setval('SOURCE_ID_SEQ', 2);
ALTER TABLE SOURCES ALTER COLUMN SOURCE_ID SET DEFAULT NEXTVAL('SOURCE_ID_SEQ');

CREATE TABLE sources (
    source_id integer NOT NULL,
    source_name character varying(512)
);


ALTER TABLE sources OWNER TO ismapro;

--
-- TOC entry 173 (class 1259 OID 16447)
-- Name: titles; Type: TABLE; Schema: public; Owner: ismapro
--


CREATE SEQUENCE TITLE_ID_SEQ;
SELECT setval('TITLE_ID_SEQ', 2);
ALTER TABLE TITLE ALTER COLUMN TITLE_ID SET DEFAULT NEXTVAL('TITLE_ID_SEQ');


CREATE TABLE titles (
    title_id bigint NOT NULL,
    title_name character varying(255),
    source_id integer
);


ALTER TABLE titles OWNER TO ismapro;

--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 177
-- Name: keyword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ismapro
--

SELECT pg_catalog.setval('keyword_id_seq', 29, true);


--
-- TOC entry 2888 (class 0 OID 16478)
-- Dependencies: 176
-- Data for Name: keywords; Type: TABLE DATA; Schema: public; Owner: ismapro
--

COPY keywords (keyword_id, keyword, usage) FROM stdin;
1   John Green (author) \N
\.


--
-- TOC entry 2886 (class 0 OID 16452)
-- Dependencies: 174
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: ismapro
--

COPY quotes (quote_id, title_id, quote) FROM stdin;
\.


--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 178
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ismapro
--

SELECT pg_catalog.setval('quotes_id_seq', 2, true);


--
-- TOC entry 2887 (class 0 OID 16460)
-- Dependencies: 175
-- Data for Name: sources; Type: TABLE DATA; Schema: public; Owner: ismapro
--

COPY sources (source_id, source_name) FROM stdin;
\.


--
-- TOC entry 2885 (class 0 OID 16447)
-- Dependencies: 173
-- Data for Name: titles; Type: TABLE DATA; Schema: public; Owner: ismapro
--

COPY titles (title_id, title_name, source_id) FROM stdin;
\.


--
-- TOC entry 2773 (class 2606 OID 16485)
-- Name: keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: ismapro
--

ALTER TABLE ONLY keywords
    ADD CONSTRAINT keywords_pkey PRIMARY KEY (keyword_id);


--
-- TOC entry 2769 (class 2606 OID 16459)
-- Name: quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: ismapro
--

ALTER TABLE ONLY quotes
    ADD CONSTRAINT quotes_pkey PRIMARY KEY (quote_id);


--
-- TOC entry 2771 (class 2606 OID 16467)
-- Name: sources_pkey; Type: CONSTRAINT; Schema: public; Owner: ismapro
--

ALTER TABLE ONLY sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (source_id);


--
-- TOC entry 2767 (class 2606 OID 16451)
-- Name: titles_pkey; Type: CONSTRAINT; Schema: public; Owner: ismapro
--

ALTER TABLE ONLY titles
    ADD CONSTRAINT titles_pkey PRIMARY KEY (title_id);


--
-- TOC entry 2775 (class 2606 OID 16468)
-- Name: fk_titles_quotes; Type: FK CONSTRAINT; Schema: public; Owner: ismapro
--

ALTER TABLE ONLY quotes
    ADD CONSTRAINT fk_titles_quotes FOREIGN KEY (title_id) REFERENCES titles(title_id);


--
-- TOC entry 2774 (class 2606 OID 16473)
-- Name: titles_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ismapro
--

ALTER TABLE ONLY titles
    ADD CONSTRAINT titles_source_id_fkey FOREIGN KEY (source_id) REFERENCES sources(source_id);


--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: ismapro
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM ismapro;
GRANT ALL ON SCHEMA public TO ismapro;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-04-08 09:56:35 CEST

--
-- PostgreSQL database dump complete
--

