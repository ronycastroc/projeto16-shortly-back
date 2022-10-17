--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    "createAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (22, 4, 'fdde8d90-184f-4761-b11d-47a9c6b1d923', '2022-10-14 01:52:52.10173-03');
INSERT INTO public.sessions VALUES (25, 5, 'e856e4ef-480f-4ed0-85cf-331b504f6d0d', '2022-10-14 02:54:34.752904-03');
INSERT INTO public.sessions VALUES (36, 3, '24b2228f-98ec-400a-b0e0-f7ed3af8b0d3', '2022-10-14 03:06:02.284573-03');
INSERT INTO public.sessions VALUES (40, 1, 'a48648ec-8aba-4c27-bf40-6fdbf0013be9', '2022-10-14 03:19:49.377619-03');
INSERT INTO public.sessions VALUES (41, 6, 'd5216d52-21f5-4be2-b2d9-d9a4173b1366', '2022-10-14 03:20:03.497674-03');
INSERT INTO public.sessions VALUES (45, 2, 'bf534c35-248b-4fe5-80fe-c3280a3517a1', '2022-10-16 21:49:17.203157-03');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 2, 'https://twitter.com/home?lang=pt', 'BABbgY0TeW3Jbx-WLd4ua', 2, '2022-10-13 19:42:31.679885-03');
INSERT INTO public.urls VALUES (4, 2, 'https://www.youtube.com/', '6gE2h0_YvovNVb-rB1PJ9', 3, '2022-10-13 19:43:43.505199-03');
INSERT INTO public.urls VALUES (6, 1, 'https://br.pinterest.com/', '3kOFparzSfe5pU3n9CaNx', 7, '2022-10-13 19:48:01.157774-03');
INSERT INTO public.urls VALUES (8, 1, 'https://www.driven.com.br/', 'M9aF2c6IG6bTbtZBt4UO6', 0, '2022-10-13 22:25:56.18095-03');
INSERT INTO public.urls VALUES (9, 3, 'https://www.netflix.com/br/', 'aMKEetfubGpUUwCMXv62B', 0, '2022-10-14 01:49:46.080713-03');
INSERT INTO public.urls VALUES (12, 6, 'https://www.apple.com/br/', 'eXB7iBfDCdeVPNJtURg2l', 0, '2022-10-14 03:37:42.414139-03');
INSERT INTO public.urls VALUES (1, 2, 'https://www.facebook.com/', 'EPDfQ7YulntSE3TuyjFw9', 3, '2022-10-13 19:41:39.782802-03');
INSERT INTO public.urls VALUES (2, 2, 'https://www.google.com/', 'wkjwTyS2oi_d9ALAAhjMc', 9, '2022-10-13 19:42:01.576053-03');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'miley', 'miley@auau.com', '$2b$10$C/A.knXObNdclvs/Ag26B.KX4kSbQugQlDBeJ8b/ZZKE3rLh8SLyO', '2022-10-11 18:06:23.42943-03');
INSERT INTO public.users VALUES (2, 'ronyn', 'ronyn@eu.com', '$2b$10$HCA6UOQxtvAYeP2WI984GuFyVdXtfKe8xBAk5oQUMKV.3O2Ilir6y', '2022-10-11 18:06:52.692579-03');
INSERT INTO public.users VALUES (3, 'eu', 'eu@eu.com', '$2b$10$UocYXkKCs7y5e/UhX8VcnOtPbKW6LD7AEBPBvtTHOmQyh0PAdIkaC', '2022-10-11 18:08:17.086006-03');
INSERT INTO public.users VALUES (4, 'João', 'joao@joao.com', '$2b$10$0JbkjfIxr1RnzQTT0JzwKeGtrhbodwDd2UDTSghurEftkNcFmfdqS', '2022-10-14 01:52:28.786735-03');
INSERT INTO public.users VALUES (5, 'let', 'let@let.com', '$2b$10$DhgTmVsc3PFNu2uKnS40HOppxD5puWfmsbgfrFngqMPWmhqysN96m', '2022-10-14 02:08:00.68487-03');
INSERT INTO public.users VALUES (6, 'tico', 'tico@tico.com', '$2b$10$hewssPwrhJuE17/uyXtTo.xf5XBtHdI9Rx9ZfsO2x6C2enq1KZ/Iy', '2022-10-14 03:08:07.140295-03');
INSERT INTO public.users VALUES (7, 'teste', 'teste@teste.com', '$2b$10$RmeaorF/vWdG4avxPit6jerLSy/PDM3sM5AQZH6xcnZPnwVPUkUwC', '2022-10-16 20:58:10.93771-03');
INSERT INTO public.users VALUES (8, 'teste2', 'teste2@teste.com', '$2b$10$Xw12aZ6LRpVhpO804JPxaeUaA2bF1NuwjvCFhEKXXhlYHET2aTjpe', '2022-10-16 21:12:36.958183-03');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 45, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

