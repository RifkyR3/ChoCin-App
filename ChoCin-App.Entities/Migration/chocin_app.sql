--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

DROP DATABASE IF EXISTS chocin_app;
--
-- Name: chocin_app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE chocin_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';


ALTER DATABASE chocin_app OWNER TO postgres;

\connect chocin_app

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
-- Name: c_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.c_group (
    group_id uuid NOT NULL,
    group_name text NOT NULL
);


ALTER TABLE public.c_group OWNER TO postgres;

--
-- Name: c_group_module; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.c_group_module (
    group_id uuid NOT NULL,
    module_id uuid NOT NULL
);


ALTER TABLE public.c_group_module OWNER TO postgres;

--
-- Name: c_module; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.c_module (
    module_id uuid NOT NULL,
    module_sub_id uuid,
    module_name text NOT NULL,
    module_icon text,
    module_path text DEFAULT ''::text NOT NULL,
    module_order integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.c_module OWNER TO postgres;

--
-- Name: c_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.c_user (
    user_id uuid NOT NULL,
    username text NOT NULL,
    user_password text NOT NULL,
    user_full_name text
);


ALTER TABLE public.c_user OWNER TO postgres;

--
-- Name: c_user_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.c_user_group (
    user_id uuid NOT NULL,
    group_id uuid NOT NULL
);


ALTER TABLE public.c_user_group OWNER TO postgres;

--
-- Data for Name: c_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.c_group VALUES ('ea3aad56-caa8-451c-8bd6-63d10c6cf2e7', 'User');
INSERT INTO public.c_group VALUES ('f24e5381-be99-4e61-8157-74e3f3097059', 'Admin');


--
-- Data for Name: c_group_module; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.c_group_module VALUES ('f24e5381-be99-4e61-8157-74e3f3097059', '2f6cc482-ffeb-46af-af7e-2407379bc059');
INSERT INTO public.c_group_module VALUES ('f24e5381-be99-4e61-8157-74e3f3097059', '48d3e0c6-daf4-481c-9d92-c101b35e8416');
INSERT INTO public.c_group_module VALUES ('f24e5381-be99-4e61-8157-74e3f3097059', 'bc065026-bad1-4802-9858-e926686aaadf');
INSERT INTO public.c_group_module VALUES ('f24e5381-be99-4e61-8157-74e3f3097059', 'ee1df381-b515-4ead-9bb1-fe8d765c9ce2');
INSERT INTO public.c_group_module VALUES ('f24e5381-be99-4e61-8157-74e3f3097059', 'f5f969ea-a4bc-4517-8675-549a02d9bd70');


--
-- Data for Name: c_module; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.c_module VALUES ('ee1df381-b515-4ead-9bb1-fe8d765c9ce2', 'bc065026-bad1-4802-9858-e926686aaadf', 'Users', 'pi pi-fw pi-users', '/users', 11);
INSERT INTO public.c_module VALUES ('48d3e0c6-daf4-481c-9d92-c101b35e8416', NULL, 'Dashboard', 'pi pi-fw pi-home', '/', 1);
INSERT INTO public.c_module VALUES ('2f6cc482-ffeb-46af-af7e-2407379bc059', 'bc065026-bad1-4802-9858-e926686aaadf', 'Groups', 'pi pi-fw pi-warehouse', '/groups', 12);
INSERT INTO public.c_module VALUES ('f5f969ea-a4bc-4517-8675-549a02d9bd70', 'bc065026-bad1-4802-9858-e926686aaadf', 'Modules', 'pi pi-fw pi-folder', '/modules', 13);
INSERT INTO public.c_module VALUES ('bc065026-bad1-4802-9858-e926686aaadf', NULL, 'App Management', 'pi pi-fw pi-cog', '', 10);


--
-- Data for Name: c_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.c_user VALUES ('35f5b7ea-5395-41a2-a133-1b6f96dcc495', 'admin', '$2a$11$JRZPATVf3hvr3nFKbdjT0.uzXtZPbSqjqv6x0fWiRScGN14bGZ.ZG', 'Admin');


--
-- Data for Name: c_user_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.c_user_group VALUES ('35f5b7ea-5395-41a2-a133-1b6f96dcc495', 'f24e5381-be99-4e61-8157-74e3f3097059');


--
-- Name: c_group_module c_group_module_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_group_module
    ADD CONSTRAINT c_group_module_pk PRIMARY KEY (group_id, module_id);


--
-- Name: c_group c_group_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_group
    ADD CONSTRAINT c_group_pk PRIMARY KEY (group_id);


--
-- Name: c_module c_module_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_module
    ADD CONSTRAINT c_module_pk PRIMARY KEY (module_id);


--
-- Name: c_user_group c_user_group_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_user_group
    ADD CONSTRAINT c_user_group_pk PRIMARY KEY (user_id, group_id);


--
-- Name: c_user c_user_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (user_id);


--
-- Name: c_user c_user_pk_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk_2 UNIQUE (username);


--
-- Name: c_group_module c_group_module_c_group_groupid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_group_module
    ADD CONSTRAINT c_group_module_c_group_groupid_fk FOREIGN KEY (group_id) REFERENCES public.c_group(group_id);


--
-- Name: c_group_module c_group_module_c_module_moduleid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_group_module
    ADD CONSTRAINT c_group_module_c_module_moduleid_fk FOREIGN KEY (module_id) REFERENCES public.c_module(module_id);


--
-- Name: c_module c_module_c_module_module_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_module
    ADD CONSTRAINT c_module_c_module_module_id_fk FOREIGN KEY (module_sub_id) REFERENCES public.c_module(module_id);


--
-- Name: c_user_group c_user_group_c_group_groupid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_user_group
    ADD CONSTRAINT c_user_group_c_group_groupid_fk FOREIGN KEY (group_id) REFERENCES public.c_group(group_id);


--
-- Name: c_user_group c_user_group_c_user_userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c_user_group
    ADD CONSTRAINT c_user_group_c_user_userid_fk FOREIGN KEY (user_id) REFERENCES public.c_user(user_id);


--
-- PostgreSQL database dump complete
--

