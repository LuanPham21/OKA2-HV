USE [QLVoucher]
GO
/****** Object:  Table [dbo].[DiaChi]    Script Date: 5/3/2021 1:13:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiaChi](
	[MaDiaChi] [nchar](10) NOT NULL,
	[MaPartner] [nchar](10) NOT NULL,
	[So] [nchar](10) NOT NULL,
	[TenDuong] [nchar](10) NOT NULL,
	[TenQuan] [nchar](10) NOT NULL,
	[TenTP] [nchar](10) NOT NULL,
	[TrangThai] [nchar](2) NOT NULL,
 CONSTRAINT [PK_DiaChi] PRIMARY KEY CLUSTERED 
(
	[MaDiaChi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DiaDiemApDung]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiaDiemApDung](
	[MaCT_Voucher] [nchar](10) NOT NULL,
	[MaVoucer] [nchar](10) NULL,
	[MaDiaChi] [nchar](10) NULL,
 CONSTRAINT [PK_DiaDiemApDung] PRIMARY KEY CLUSTERED 
(
	[MaCT_Voucher] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DieuKien]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DieuKien](
	[MaDieuKien] [nchar](10) NOT NULL,
	[TenDieuKien] [nchar](10) NOT NULL,
	[MaVoucher] [nchar](10) NOT NULL,
	[LoaiDieuKien] [nchar](2) NOT NULL,
	[GiaTri] [float] NULL,
 CONSTRAINT [PK_DieuKien] PRIMARY KEY CLUSTERED 
(
	[MaDieuKien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhachHang](
	[MaKhachHang] [nchar](10) NOT NULL,
	[TenKhachHang] [nchar](10) NULL,
	[UserName] [nchar](10) NULL,
	[TrangThai] [nchar](2) NULL,
 CONSTRAINT [PK_KhachHang] PRIMARY KEY CLUSTERED 
(
	[MaKhachHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_KhachHang] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoaiVoucher]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiVoucher](
	[MaLoaiVoucher] [nchar](5) NOT NULL,
	[TenLoai] [nchar](10) NULL,
 CONSTRAINT [PK_LoaiVoucher] PRIMARY KEY CLUSTERED 
(
	[MaLoaiVoucher] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MuaHang]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MuaHang](
	[MaMua] [nchar](10) NOT NULL,
	[Ngay] [date] NOT NULL,
	[MaKhachHang] [nchar](10) NOT NULL,
	[MaVoucher] [nchar](10) NOT NULL,
	[SoLuong] [int] NOT NULL,
	[TongTien] [float] NOT NULL,
 CONSTRAINT [PK_MuaHang] PRIMARY KEY CLUSTERED 
(
	[MaMua] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NguoiDung]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDung](
	[UserName] [nchar](10) NOT NULL,
	[Password] [nchar](10) NOT NULL,
	[Role] [nchar](2) NOT NULL,
	[TrangThai] [nchar](2) NOT NULL,
 CONSTRAINT [PK_NguoiDung_1] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Partner]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partner](
	[MaPartner] [nchar](10) NOT NULL,
	[TenPartner] [nchar](10) NOT NULL,
	[UserName] [nchar](10) NOT NULL,
	[LoaiPartner] [nchar](2) NOT NULL,
	[TrangThai] [nchar](2) NOT NULL,
 CONSTRAINT [PK_Partner] PRIMARY KEY CLUSTERED 
(
	[MaPartner] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_Partner] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 5/3/2021 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Voucher](
	[MaVoucher] [nchar](10) NOT NULL,
	[TenVoucher] [nvarchar](50) NOT NULL,
	[MaLoaiVoucher] [nchar](5) NOT NULL,
	[SoLuong] [int] NOT NULL,
	[NgayBatDau] [date] NOT NULL,
	[NgayKetThuc] [date] NOT NULL,
	[GiaTriSuDung] [float] NOT NULL,
	[GiaTien] [float] NOT NULL,
	[Hinh] [nchar](400) NOT NULL,
	[TrangThai] [nchar](1) NOT NULL,
 CONSTRAINT [PK_Voucher] PRIMARY KEY CLUSTERED 
(
	[MaVoucher] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[DiaChi]  WITH CHECK ADD  CONSTRAINT [FK_DiaChi_Partner] FOREIGN KEY([MaPartner])
REFERENCES [dbo].[Partner] ([MaPartner])
GO
ALTER TABLE [dbo].[DiaChi] CHECK CONSTRAINT [FK_DiaChi_Partner]
GO
ALTER TABLE [dbo].[DiaDiemApDung]  WITH CHECK ADD  CONSTRAINT [FK_DiaDiemApDung_DiaChi] FOREIGN KEY([MaDiaChi])
REFERENCES [dbo].[DiaChi] ([MaDiaChi])
GO
ALTER TABLE [dbo].[DiaDiemApDung] CHECK CONSTRAINT [FK_DiaDiemApDung_DiaChi]
GO
ALTER TABLE [dbo].[DiaDiemApDung]  WITH CHECK ADD  CONSTRAINT [FK_DiaDiemApDung_Voucher] FOREIGN KEY([MaVoucer])
REFERENCES [dbo].[Voucher] ([MaVoucher])
GO
ALTER TABLE [dbo].[DiaDiemApDung] CHECK CONSTRAINT [FK_DiaDiemApDung_Voucher]
GO
ALTER TABLE [dbo].[DieuKien]  WITH CHECK ADD  CONSTRAINT [FK_DieuKien_Voucher] FOREIGN KEY([MaVoucher])
REFERENCES [dbo].[Voucher] ([MaVoucher])
GO
ALTER TABLE [dbo].[DieuKien] CHECK CONSTRAINT [FK_DieuKien_Voucher]
GO
ALTER TABLE [dbo].[KhachHang]  WITH CHECK ADD  CONSTRAINT [FK_KhachHang_NguoiDung1] FOREIGN KEY([UserName])
REFERENCES [dbo].[NguoiDung] ([UserName])
GO
ALTER TABLE [dbo].[KhachHang] CHECK CONSTRAINT [FK_KhachHang_NguoiDung1]
GO
ALTER TABLE [dbo].[MuaHang]  WITH CHECK ADD  CONSTRAINT [FK_MuaHang_KhachHang] FOREIGN KEY([MaKhachHang])
REFERENCES [dbo].[KhachHang] ([MaKhachHang])
GO
ALTER TABLE [dbo].[MuaHang] CHECK CONSTRAINT [FK_MuaHang_KhachHang]
GO
ALTER TABLE [dbo].[MuaHang]  WITH CHECK ADD  CONSTRAINT [FK_MuaHang_Voucher] FOREIGN KEY([MaVoucher])
REFERENCES [dbo].[Voucher] ([MaVoucher])
GO
ALTER TABLE [dbo].[MuaHang] CHECK CONSTRAINT [FK_MuaHang_Voucher]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_NguoiDung1] FOREIGN KEY([UserName])
REFERENCES [dbo].[NguoiDung] ([UserName])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_NguoiDung1]
GO
ALTER TABLE [dbo].[Voucher]  WITH CHECK ADD  CONSTRAINT [FK_Voucher_LoaiVoucher] FOREIGN KEY([MaLoaiVoucher])
REFERENCES [dbo].[LoaiVoucher] ([MaLoaiVoucher])
GO
ALTER TABLE [dbo].[Voucher] CHECK CONSTRAINT [FK_Voucher_LoaiVoucher]
GO
