---
title: "最小二乗法について"
date: "2026-01-03"
category: "research"
description: "最小二乗法による回帰直線の導出と回帰直線上の推定値の不確かさについて考えてみます。"
id: "least_square"
---

## Regression line by least squares fit

観測値 $(x_i, y_i) = (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)$ が得られたとき、$x_i$ を説明変数として、目的変数である真の値 $\hat{y}_i$ を推定する。線形回帰、特に単回帰モデルにおいては直線の式
$$
  \begin{align}
    \hat{y}_i = a_0 + a_1 x_i
  \end{align}
$$
が成り立つと仮定して、観測値 $y_i$ と推定値 $\hat{y}_i$ のカイ二乗誤差
$$
  \begin{align}
    \chi^2(a_0, a_1) = \sum_{i=1}^{N} \left(\frac{y_i - \hat{y}_i}{\sigma_i}\right)^2 = \sum_{i=1}^{N} \left(\frac{y_i - a_0 - a_1 x_i}{\sigma_i}\right)^2
  \end{align}
$$
が最小となる直線の切片 $a_0$ と傾き $a_1$ (回帰係数) を推定する。$\chi^2(a_0, a_1)$ を回帰係数 $a_0$, $a_1$ それぞれで偏微分すると
$$
  \begin{align}
    \frac{\partial \chi^2}{\partial a_0} &= \sum_{i=1}^{N} \left\{2\left(\frac{y_i - a_0 - a_1 x_i}{\sigma_i}\right)\left(-\frac{1}{\sigma_i}\right)\right\}\\
    &= -2\sum_{i=1}^{N} \left(\frac{y_i - a_0 - a_1 x_i}{\sigma_i^2}\right)\\
    \frac{\partial \chi^2}{\partial a_1} &= \sum_{i=1}^{N} \left\{2\left(\frac{y_i - a_0 - a_1 x_i}{\sigma_i}\right)\left(-\frac{x_i}{\sigma_i}\right)\right\}\\
    &= -2\sum_{i=1}^{N} \left(\frac{y_i x_i - a_0 x_i - a_1 x_i^2}{\sigma_i^2}\right)
  \end{align}
$$
$\frac{\partial \chi^2}{\partial a_0}$, $\frac{\partial \chi^2}{\partial a_1}$ ともに単調増加関数であるから、$\frac{\partial \chi^2}{\partial a_0} = \frac{\partial \chi^2}{\partial a_1} = 0$ となる点で $\chi^2(a_0, a_1)$ は最小値をとる。したがって、求める回帰係数 $a_0$, $a_1$ は次の2元1次連立方程式の解となる。
$$
  \begin{align}
    \sum_{i=1}^{N}\frac{a_0}{\sigma_i^2} + \sum_{i=1}^{N}\frac{a_1 x_i}{\sigma_i^2} &= \sum_{i=1}^{N}\frac{y_i}{\sigma_i^2}\\
    \sum_{i=1}^{N}\frac{a_0 x_i}{\sigma_i^2} + \sum_{i=1}^{N}\frac{a_1 x_i^2}{\sigma_i^2} &= \sum_{i=1}^{N}\frac{y_i x_i}{\sigma_i^2}
  \end{align}
$$
ここで、$U_{\alpha\beta} = \textstyle\sum\limits_{i=1}^{N}\frac{x_i^{\alpha + \beta}}{\sigma_i^2}$, $v_{\alpha} = \textstyle\sum\limits_{i=1}^{N}\frac{y_i x_i^{\alpha}}{\sigma_i^2}$ とおくと
$$
  \begin{align}
    a_0 U_{00} + a_1 U_{01} &= v_{0}\\
    a_0 U_{10} + a_1 U_{11} &= v_{1}\\
    \Leftrightarrow 
    \begin{pmatrix}
      U_{00} & U_{01}\\
      U_{10} & U_{11}\\
    \end{pmatrix}
    \begin{pmatrix}
      a_0 \\ a_1 \\
    \end{pmatrix}
    &=
    \begin{pmatrix}
      v_0 \\ v_1 \\
    \end{pmatrix}
    %\label{eq:u_matrix}
  \end{align}
$$
Eq. (11) を $\mathrm{U} \mathbf{a} = \mathbf{v}$ とすると、求める解は $\mathbf{a} = \mathrm{U}^{-1} \mathbf{v}$ である。ここで、$\mathrm{U}^{-1}$ は 2$\times$2 行列 $\mathrm{U}$ の逆行列であり、$U_{01} = U_{10}$ であるから
$$
  \begin{align}
    \mathrm{U}^{-1} &= \frac{1}{\Delta}
    \begin{pmatrix}
      U_{11} & -U_{01}\\
      -U_{10} & U_{00}\\
    \end{pmatrix}\\
    \Delta &= U_{00}U_{11} - U_{01}^2
  \end{align}
$$
したがって、
$$
  \begin{align}
    a_0 &= \frac{U_{11}v_0 - U_{01}v_1}{\Delta}\\
    a_1 &= \frac{-U_{01}v_0 + U_{00}v_1}{\Delta}
  \end{align}
$$

回帰係数 $a_0$ の不確かさを観測値 $y_i$ の不確かさ $\sigma_i$ を伝播させることによって求める。
$$
  \begin{align}
    (\delta a_0)^2 = \sum_{i=1}^{N} \left(\frac{\partial a_0}{\partial y_i}\right)^2 \sigma_i^2
  \end{align}
$$
ここで、
$$
  \begin{align}
    \frac{\partial a_0}{\partial y_i} &= \frac{1}{\Delta} \left(U_{11} \frac{\partial v_0}{\partial y_i} - U_{01} \frac{\partial v_1}{\partial y_i}\right)\\
    &= \frac{1}{\Delta} \left(U_{11} \frac{1}{\sigma_i^2} - U_{01} \frac{x_i}{\sigma_i^2}\right)
  \end{align}
$$
であるから、
$$
  \begin{align}
    (\delta a_0)^2 &= \sum_{i=1}^{N} \frac{1}{\Delta^2} \left(U_{11}^2 \frac{1}{\sigma_i^2} - 2U_{11}U_{01}\frac{x_i}{\sigma_i^2} + U_{01}^2 \frac{x_i^2}{\sigma_i^2}\right)\\
    &= \frac{1}{\Delta^2} (U_{11}^2 U_{00} - 2 U_{11} U_{01}^2 + U_{01}^2 U_{11})\\
    &= \frac{U_{11}}{\Delta^2}(U_{11} U_{00} - U_{01}^2)\\
    &= \frac{U_{11}}{\Delta}
  \end{align}
$$
同様に
$$
\begin{align}
  (\delta a_1)^2 = \frac{U_{00}}{\Delta}
\end{align}
$$
すなわち、$(\delta a_0)^2 = (\mathrm{U}^{-1})_{00}$, $(\delta a_1)^2 = (\mathrm{U}^{-1})_{11}$ により求められる。$\mathrm{U}^{-1}$ は分散共分散行列と呼ばれ、次のように記述できる。
$$
\begin{align}
  \mathrm{U}^{-1} =
  \begin{pmatrix}
    (\delta a_0)^2 & \delta a_0 a_1 \\
    \delta a_1 a_0 & (\delta a_1)^2 \\
  \end{pmatrix}
\end{align}
$$
$\delta a_0 a_1$ は $a_0$ と $a_1$ の共分散に相当する。

ちなみに、説明変数 $x_i$ の平均値を $\overline{x}$, $x_i^2$ の平均値を $\overline{x^2}$, $\sigma_i^2$ の平均値を $\overline{\sigma^2}$ とすると
$$
\begin{align}
  (\delta a_0)^2 &= \frac{U_{11}}{\Delta} = \frac{\overline{\sigma^2}}{\overline{x^2} - (\overline{x})^2} \cdot \overline{x^2}\\
  (\delta a_1)^2 &= \frac{U_{00}}{\Delta} = \frac{\overline{\sigma^2}}{\overline{x^2} - (\overline{x})^2}
\end{align}
$$
と表現でき、回帰係数 $a_0$ と $a_1$ の不確かさは説明変数 $x_i$ の分散 $\overline{x^2} - (\overline{x})^2$ に反比例し、観測値 $y_i$ の不確かさ $\sigma_i$ の2乗平均値に比例する。

推定値 $\hat{y}_i$ の不確かさ $\delta \hat{y}_i$ を観測値 $x_i$ の不確かさ $\delta x_i$, 回帰係数 $a_0$, $a_1$ の不確かさ $\delta a_0$, $\delta a_1$ の伝播により求める。$\delta x_i$ は $\delta a_0$, $\delta a_1$ と互いに独立であるから
$$
\begin{align}
  \delta \hat{y}_i &= \sqrt{\left(\frac{\partial \hat{y}_i}{\partial x_i}\delta x_i\right)^2 + \left(\frac{\partial \hat{y}_i}{\partial a_0}\delta a_0\right)^2 + \left(\frac{\partial \hat{y}_i}{\partial a_1}\delta a_1\right)^2 + 2 \left(\frac{\partial \hat{y}_i}{\partial a_0}\frac{\partial \hat{y}_i}{\partial a_1}\delta a_0 a_1\right)}\\
  &= \sqrt{(a_1 \cdot \delta x_i)^2 + (1 \cdot \delta a_0)^2 + (x_i \cdot \delta a_1)^2 + 2 (x_i \cdot 1 \cdot \delta a_0 a_1)}
\end{align}
$$