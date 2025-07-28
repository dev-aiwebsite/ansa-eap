--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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
-- Name: daily_activities; Type: TABLE; Schema: public; Owner: ansaadmin
--

CREATE TABLE public.daily_activities (
    id text NOT NULL,
    user_id text,
    reading_minutes integer DEFAULT 0,
    video_minutes integer DEFAULT 0,
    writing_minutes integer DEFAULT 0,
    task_minutes integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.daily_activities OWNER TO ansaadmin;

--
-- Name: daily_check_ins; Type: TABLE; Schema: public; Owner: ansaadmin
--

CREATE TABLE public.daily_check_ins (
    id text NOT NULL,
    user_id text,
    responses jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.daily_check_ins OWNER TO ansaadmin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ansaadmin
--

CREATE TABLE public.users (
    id text NOT NULL,
    first_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone,
    last_name text
);


ALTER TABLE public.users OWNER TO ansaadmin;

--
-- Data for Name: daily_activities; Type: TABLE DATA; Schema: public; Owner: ansaadmin
--

COPY public.daily_activities (id, user_id, reading_minutes, video_minutes, writing_minutes, task_minutes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: daily_check_ins; Type: TABLE DATA; Schema: public; Owner: ansaadmin
--

COPY public.daily_check_ins (id, user_id, responses, created_at, updated_at) FROM stdin;
Y14Zqtlpfl	1kj23lk1j2	[{"answer": 2, "question": "How would you rate your energy today?"}, {"answer": 3, "question": "How stressed are you feeling right now?"}, {"answer": 4, "question": "How are you feeling today overall?"}]	2025-07-21 11:05:06.465217+08	2025-07-21 11:05:06.465217+08
Y14Zqtlpft	1kj23lk1j2	[{"answer": 4, "question": "How would you rate your energy today?"}, {"answer": 4, "question": "How stressed are you feeling right now?"}, {"answer": 5, "question": "How are you feeling today overall?"}]	2025-07-18 11:05:06.465217+08	2025-07-18 11:05:06.465217+08
Y14Zqtlpfr	1kj23lk1j2	[{"answer": 5, "question": "How would you rate your energy today?"}, {"answer": 5, "question": "How stressed are you feeling right now?"}, {"answer": 5, "question": "How are you feeling today overall?"}]	2025-07-19 11:05:06.465217+08	2025-07-19 11:05:06.465217+08
Y14Zqtlpfq	1kj23lk1j2	[{"answer": 2, "question": "How would you rate your energy today?"}, {"answer": 3, "question": "How stressed are you feeling right now?"}, {"answer": 3, "question": "How are you feeling today overall?"}]	2025-07-20 11:05:06.465217+08	2025-07-20 11:05:06.465217+08
t9rzsCp3dK	1kj23lk1j2	[{"answer": 3, "question": "How would you rate your energy today?"}, {"answer": 4, "question": "How stressed are you feeling right now?"}, {"answer": 5, "question": "How are you feeling today overall?"}]	2025-07-22 09:18:17.759048+08	2025-07-22 09:18:17.759048+08
YTrSVJzzb2	1kj23lk1j2	[{"answer": 2, "question": "How would you rate your energy today?"}, {"answer": 3, "question": "How stressed are you feeling right now?"}, {"answer": 5, "question": "How are you feeling today overall?"}]	2025-07-22 09:19:13.105825+08	2025-07-22 09:19:13.105825+08
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ansaadmin
--

COPY public.users (id, first_name, email, password, created_at, updated_at, last_name) FROM stdin;
1kj23lk1j2	Ian	ian@gmail.com	Welcome1!	2025-07-19 10:43:32.232784+08	2025-07-19 10:46:42.125176+08	Rafols
\.


--
-- Name: daily_activities daily_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: ansaadmin
--

ALTER TABLE ONLY public.daily_activities
    ADD CONSTRAINT daily_activities_pkey PRIMARY KEY (id);


--
-- Name: daily_check_ins daily_check_ins_pkey; Type: CONSTRAINT; Schema: public; Owner: ansaadmin
--

ALTER TABLE ONLY public.daily_check_ins
    ADD CONSTRAINT daily_check_ins_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ansaadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ansaadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: daily_activities daily_activities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ansaadmin
--

ALTER TABLE ONLY public.daily_activities
    ADD CONSTRAINT daily_activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: daily_check_ins daily_check_ins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ansaadmin
--

ALTER TABLE ONLY public.daily_check_ins
    ADD CONSTRAINT daily_check_ins_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

