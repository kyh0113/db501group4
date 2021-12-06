drop table Reservation;
drop table Teacher;
drop table Price;
drop table Eyelash_shop;
drop table Customer;


create table Customer(
	c_id varchar2(20) not null,
	c_pw varchar2(20),
	c_repeatpw varchar2(20),
	c_phonenumber varchar2(20),
	c_address_si varchar2(20),
	c_address_gu varchar2(20),
	c_birth varchar2(20),
	c_name varchar2(20),
	constraint Customer_c_id_pk primary key(c_id)
);

create table Eyelash_shop(
	s_id varchar2(20) not null,
	s_pw varchar2(20),
	s_repeatpw varchar2(20),
	s_name varchar2(20),
	s_address_si varchar2(20),
	s_address_gu varchar2(20),
	s_address_detail varchar2(50),
	s_shopnumber varchar2(20),
	constraint Eyelash_shop_s_id_pk primary key(s_id)
);

create table Price(
	s_id varchar2(20) not null,
	perm varchar2(10),
	extension varchar2(10),
	care varchar2(10),
	constraint Price_s_id_pk primary key(s_id),
	constraint Price_s_id_fk foreign key(s_id) references Eyelash_shop (s_id)
);

create table Teacher(
	t_id number(4) not null,
	s_id varchar2(20) not null,
	t_name varchar2(20),
	constraint Teacher_t_id_pk primary key (t_id),
	constraint Teacher_s_id_fk foreign key(s_id) references Eyelash_shop (s_id)
);

create table Reservation(
	r_id number(4) not null,
	c_id varchar2(20) not null,
	t_id number(4) not null,
	r_date varchar2(20) not null,
	r_time varchar2(10) not null,
	r_style varchar2(20) not null,
	constraint Reservation_r_id_pk primary key (r_id),
	constraint Reservation_c_id_fk foreign key(c_id) references Customer (c_id),
	constraint Reservation_t_id_fk foreign key(t_id) references Teacher (t_id)
);