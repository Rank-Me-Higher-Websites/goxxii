--
-- PostgreSQL database dump
--

\restrict P3E91CFdkMwOUkWMXu95Y2nIe6yMgZVUdQvSQhjMMSEqauvqyqsWwXjVgFMjKog

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

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

DROP INDEX IF EXISTS public.drivers_survey_token_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.retention_check_ins DROP CONSTRAINT IF EXISTS retention_check_ins_pkey;
ALTER TABLE IF EXISTS ONLY public.leads DROP CONSTRAINT IF EXISTS leads_pkey;
ALTER TABLE IF EXISTS ONLY public.drivers DROP CONSTRAINT IF EXISTS drivers_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.retention_check_ins ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.leads ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.drivers ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.retention_check_ins_id_seq;
DROP TABLE IF EXISTS public.retention_check_ins;
DROP SEQUENCE IF EXISTS public.leads_id_seq;
DROP TABLE IF EXISTS public.leads;
DROP SEQUENCE IF EXISTS public.drivers_id_seq;
DROP TABLE IF EXISTS public.drivers;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: drivers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drivers (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    phone character varying(50),
    email character varying(255),
    hire_date timestamp without time zone NOT NULL,
    status character varying(50) DEFAULT 'active'::character varying NOT NULL,
    truck_number character varying(50),
    recruiter character varying(255),
    retention_score integer,
    risk_level character varying(20) DEFAULT 'unknown'::character varying,
    notes text,
    survey_token character varying(64),
    next_survey_email_at timestamp without time zone
);


--
-- Name: drivers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.drivers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: drivers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.drivers_id_seq OWNED BY public.drivers.id;


--
-- Name: leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leads (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    email character varying(255),
    vehicle character varying(255),
    message text,
    source character varying(100) NOT NULL,
    recruiter character varying(100),
    payload jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: leads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.leads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: leads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.leads_id_seq OWNED BY public.leads.id;


--
-- Name: retention_check_ins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.retention_check_ins (
    id integer NOT NULL,
    driver_id integer NOT NULL,
    check_in_type character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    submitted_by integer,
    completed_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ai_risk_score integer,
    ai_summary text,
    responses jsonb
);


--
-- Name: retention_check_ins_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.retention_check_ins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: retention_check_ins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.retention_check_ins_id_seq OWNED BY public.retention_check_ins.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'dispatcher'::character varying NOT NULL
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
-- Name: drivers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drivers ALTER COLUMN id SET DEFAULT nextval('public.drivers_id_seq'::regclass);


--
-- Name: leads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads ALTER COLUMN id SET DEFAULT nextval('public.leads_id_seq'::regclass);


--
-- Name: retention_check_ins id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retention_check_ins ALTER COLUMN id SET DEFAULT nextval('public.retention_check_ins_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: drivers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.drivers (id, first_name, last_name, phone, email, hire_date, status, truck_number, recruiter, retention_score, risk_level, notes, survey_token, next_survey_email_at) FROM stdin;
2	Marcus	Johnson	(773) 555-0198	\N	2026-03-01 00:00:00	active	3155	Milos	\N	unknown	\N	256055e039090f8246ab285914916e24230f3ff8eb7c5fde	\N
3	David	Kowalski	(847) 555-0234	\N	2026-02-01 00:00:00	active	1923	Ben	40	high	\N	e18e85a84aedda7e2ca6d1bfc04e43c49eb629882f059d69	\N
1	John	Mitchell	(312) 555-0142	john.m@gmail.com	2026-02-15 00:00:00	active	2847	Ben	96	low	\N	a946620c59ebeb40958cee844f9f90d058a95790b1160ed5	\N
4	Andrius	Pletniovas	7738294489	andrius@cdlagency.com	2026-03-18 15:59:19.06	active	1249	Milos	75	low	\N	113f8ef86a7f024cda0c310b357a5d7c62d14d9b32d36eb2	\N
5	Test	Test	123123123	test@gmail.com	2026-04-01 21:00:05.394	active	1241	Test	\N	unknown	\N	c69c6cc3ea2ac19bbbcea4a2ffb68557f3527e9f23d5c5e1	\N
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.leads (id, name, phone, email, vehicle, message, source, recruiter, payload, created_at) FROM stdin;
\.


--
-- Data for Name: retention_check_ins; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.retention_check_ins (id, driver_id, check_in_type, status, submitted_by, completed_at, created_at, ai_risk_score, ai_summary, responses) FROM stdin;
1	3	week1	completed	1	2026-03-10 00:00:00	2026-03-16 22:32:43.996794	40	Multiple risk factors identified. Immediate intervention recommended to prevent turnover.	{"wish_known": "How settlements work", "truck_clean": "yes", "tools_access": "Yes, received all apps on time", "promise_match": "partially", "stress_source": "Late dispatch on first day, nobody answered phone", "feel_supported": "no", "missing_first_day": "Clear schedule and expectations", "orientation_clarity": "Confusing, no structure", "first_load_explained": "no", "promise_mismatch_detail": "Was told truck would be brand new, got 2023 model with 180k miles"}
2	1	week1	completed	1	2026-03-05 00:00:00	2026-03-16 22:33:02.544913	100	Driver shows strong satisfaction and engagement. Low flight risk.	{"wish_known": "Nothing comes to mind", "truck_clean": "yes", "tools_access": "Everything was set up before I arrived", "promise_match": "fully", "stress_source": "No stress, great start", "feel_supported": "yes", "missing_first_day": "Nothing, it was smooth", "orientation_clarity": "Well structured and professional", "first_load_explained": "yes"}
3	1	week4	completed	1	2026-03-15 00:00:00	2026-03-16 22:33:02.630267	96	Driver shows strong satisfaction and engagement. Low flight risk.	{"nps_score": 9, "pay_aligned": "yes", "dream_feature": "Guaranteed weekend home time with bonus for extra miles", "top_improvement": "Maybe add more fuel stations to the network", "considered_leaving": "no", "settlement_clarity": "yes", "profitable_long_term": "yes", "home_time_satisfaction": "satisfied"}
4	4	week1	completed	\N	2026-03-18 15:59:30.907	2026-03-18 15:59:30.90766	100	Driver shows strong satisfaction and engagement. Low flight risk.	{"wish_known": "test", "truck_clean": "yes", "tools_access": "test", "promise_match": "fully", "stress_source": "test", "feel_supported": "yes", "missing_first_day": "test", "orientation_clarity": "test", "first_load_explained": "yes"}
5	4	week2	completed	\N	2026-03-18 18:08:17.706	2026-03-18 18:08:17.70734	100	Driver shows strong satisfaction and engagement. Low flight risk.	{"lanes_match": "yes", "tech_issues": "test", "feel_respected": "yes", "company_support": "fully_supports", "support_example": "test", "pay_understanding": "yes", "unexpected_delays": "test", "comfortable_reporting": "yes", "dispatcher_responsiveness": "excellent"}
6	4	week3	completed	\N	2026-03-18 18:10:05.969	2026-03-18 18:10:05.970232	100	Driver shows strong satisfaction and engagement. Low flight risk.	{"week3_feedback": "test", "safety_concerns": "test", "miles_consistent": "yes", "team_relationship": "great", "routine_established": "yes", "maintenance_response": "next_day", "overall_satisfaction": "very_satisfied", "communication_quality": "excellent"}
7	4	week4	completed	\N	2026-03-18 18:11:30.435	2026-03-18 18:11:30.436587	75	Driver shows strong satisfaction and engagement. Low flight risk.	{"nps_score": 3, "pay_aligned": "no", "dream_feature": "test", "leaving_reason": "test", "considered_leaving": "yes", "settlement_clarity": "yes", "profitable_long_term": "yes", "home_time_satisfaction": "satisfied"}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password, name, role) FROM stdin;
1	admin	$2b$10$G/c96j5Tzd/MHtB9rYyytOzHX5AJ1uEkEBWIJZzJktrw1ZGnS5LNS	Admin User	admin
\.


--
-- Name: drivers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.drivers_id_seq', 6, true);


--
-- Name: leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.leads_id_seq', 1, true);


--
-- Name: retention_check_ins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.retention_check_ins_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: drivers drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: retention_check_ins retention_check_ins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retention_check_ins
    ADD CONSTRAINT retention_check_ins_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: drivers_survey_token_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX drivers_survey_token_unique ON public.drivers USING btree (survey_token) WHERE (survey_token IS NOT NULL);


--
-- PostgreSQL database dump complete
--

\unrestrict P3E91CFdkMwOUkWMXu95Y2nIe6yMgZVUdQvSQhjMMSEqauvqyqsWwXjVgFMjKog

