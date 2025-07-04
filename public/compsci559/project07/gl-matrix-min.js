/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

!(function (t, a) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = a();
  else if ("function" == typeof define && define.amd) define([], a);
  else {
    var n = a();
    for (var r in n) ("object" == typeof exports ? exports : t)[r] = n[r];
  }
})(this, function () {
  return (function (t) {
    function a(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { exports: {}, id: r, loaded: !1 });
      return t[r].call(o.exports, o, o.exports, a), (o.loaded = !0), o.exports;
    }
    var n = {};
    return (a.m = t), (a.c = n), (a.p = ""), a(0);
  })([
    function (t, a, n) {
      (a.glMatrix = n(1)),
        (a.mat2 = n(2)),
        (a.mat2d = n(3)),
        (a.mat3 = n(4)),
        (a.mat4 = n(5)),
        (a.quat = n(6)),
        (a.vec2 = n(9)),
        (a.vec3 = n(7)),
        (a.vec4 = n(8));
    },
    function (t, a) {
      var n = {};
      (n.EPSILON = 1e-6),
        (n.ARRAY_TYPE =
          "undefined" != typeof Float32Array ? Float32Array : Array),
        (n.RANDOM = Math.random),
        (n.ENABLE_SIMD = !1),
        (n.SIMD_AVAILABLE = n.ARRAY_TYPE === Float32Array && "SIMD" in this),
        (n.USE_SIMD = n.ENABLE_SIMD && n.SIMD_AVAILABLE),
        (n.setMatrixArrayType = function (t) {
          n.ARRAY_TYPE = t;
        });
      var r = Math.PI / 180;
      (n.toRadian = function (t) {
        return t * r;
      }),
        (n.equals = function (t, a) {
          return (
            Math.abs(t - a) <= n.EPSILON * Math.max(1, Math.abs(t), Math.abs(a))
          );
        }),
        (t.exports = n);
    },
    function (t, a, n) {
      var r = n(1),
        o = {};
      (o.create = function () {
        var t = new r.ARRAY_TYPE(4);
        return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 1), t;
      }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(4);
          return (a[0] = t[0]), (a[1] = t[1]), (a[2] = t[2]), (a[3] = t[3]), a;
        }),
        (o.copy = function (t, a) {
          return (t[0] = a[0]), (t[1] = a[1]), (t[2] = a[2]), (t[3] = a[3]), t;
        }),
        (o.identity = function (t) {
          return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 1), t;
        }),
        (o.fromValues = function (t, a, n, o) {
          var u = new r.ARRAY_TYPE(4);
          return (u[0] = t), (u[1] = a), (u[2] = n), (u[3] = o), u;
        }),
        (o.set = function (t, a, n, r, o) {
          return (t[0] = a), (t[1] = n), (t[2] = r), (t[3] = o), t;
        }),
        (o.transpose = function (t, a) {
          if (t === a) {
            var n = a[1];
            (t[1] = a[2]), (t[2] = n);
          } else (t[0] = a[0]), (t[1] = a[2]), (t[2] = a[1]), (t[3] = a[3]);
          return t;
        }),
        (o.invert = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = n * u - o * r;
          return l
            ? ((l = 1 / l),
              (t[0] = u * l),
              (t[1] = -r * l),
              (t[2] = -o * l),
              (t[3] = n * l),
              t)
            : null;
        }),
        (o.adjoint = function (t, a) {
          var n = a[0];
          return (t[0] = a[3]), (t[1] = -a[1]), (t[2] = -a[2]), (t[3] = n), t;
        }),
        (o.determinant = function (t) {
          return t[0] * t[3] - t[2] * t[1];
        }),
        (o.multiply = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = n[0],
            M = n[1],
            s = n[2],
            i = n[3];
          return (
            (t[0] = r * e + u * M),
            (t[1] = o * e + l * M),
            (t[2] = r * s + u * i),
            (t[3] = o * s + l * i),
            t
          );
        }),
        (o.mul = o.multiply),
        (o.rotate = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = Math.sin(n),
            M = Math.cos(n);
          return (
            (t[0] = r * M + u * e),
            (t[1] = o * M + l * e),
            (t[2] = r * -e + u * M),
            (t[3] = o * -e + l * M),
            t
          );
        }),
        (o.scale = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = n[0],
            M = n[1];
          return (
            (t[0] = r * e), (t[1] = o * e), (t[2] = u * M), (t[3] = l * M), t
          );
        }),
        (o.fromRotation = function (t, a) {
          var n = Math.sin(a),
            r = Math.cos(a);
          return (t[0] = r), (t[1] = n), (t[2] = -n), (t[3] = r), t;
        }),
        (o.fromScaling = function (t, a) {
          return (t[0] = a[0]), (t[1] = 0), (t[2] = 0), (t[3] = a[1]), t;
        }),
        (o.str = function (t) {
          return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
        }),
        (o.frob = function (t) {
          return Math.sqrt(
            Math.pow(t[0], 2) +
              Math.pow(t[1], 2) +
              Math.pow(t[2], 2) +
              Math.pow(t[3], 2),
          );
        }),
        (o.LDU = function (t, a, n, r) {
          return (
            (t[2] = r[2] / r[0]),
            (n[0] = r[0]),
            (n[1] = r[1]),
            (n[3] = r[3] - t[2] * n[1]),
            [t, a, n]
          );
        }),
        (o.add = function (t, a, n) {
          return (
            (t[0] = a[0] + n[0]),
            (t[1] = a[1] + n[1]),
            (t[2] = a[2] + n[2]),
            (t[3] = a[3] + n[3]),
            t
          );
        }),
        (o.subtract = function (t, a, n) {
          return (
            (t[0] = a[0] - n[0]),
            (t[1] = a[1] - n[1]),
            (t[2] = a[2] - n[2]),
            (t[3] = a[3] - n[3]),
            t
          );
        }),
        (o.sub = o.subtract),
        (o.exactEquals = function (t, a) {
          return (
            t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3]
          );
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = t[2],
            l = t[3],
            e = a[0],
            M = a[1],
            s = a[2],
            i = a[3];
          return (
            Math.abs(n - e) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(e)) &&
            Math.abs(o - M) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(M)) &&
            Math.abs(u - s) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(s)) &&
            Math.abs(l - i) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(i))
          );
        }),
        (o.multiplyScalar = function (t, a, n) {
          return (
            (t[0] = a[0] * n),
            (t[1] = a[1] * n),
            (t[2] = a[2] * n),
            (t[3] = a[3] * n),
            t
          );
        }),
        (o.multiplyScalarAndAdd = function (t, a, n, r) {
          return (
            (t[0] = a[0] + n[0] * r),
            (t[1] = a[1] + n[1] * r),
            (t[2] = a[2] + n[2] * r),
            (t[3] = a[3] + n[3] * r),
            t
          );
        }),
        (t.exports = o);
    },
    function (t, a, n) {
      var r = n(1),
        o = {};
      (o.create = function () {
        var t = new r.ARRAY_TYPE(6);
        return (
          (t[0] = 1),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 1),
          (t[4] = 0),
          (t[5] = 0),
          t
        );
      }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(6);
          return (
            (a[0] = t[0]),
            (a[1] = t[1]),
            (a[2] = t[2]),
            (a[3] = t[3]),
            (a[4] = t[4]),
            (a[5] = t[5]),
            a
          );
        }),
        (o.copy = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = a[2]),
            (t[3] = a[3]),
            (t[4] = a[4]),
            (t[5] = a[5]),
            t
          );
        }),
        (o.identity = function (t) {
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 1),
            (t[4] = 0),
            (t[5] = 0),
            t
          );
        }),
        (o.fromValues = function (t, a, n, o, u, l) {
          var e = new r.ARRAY_TYPE(6);
          return (
            (e[0] = t),
            (e[1] = a),
            (e[2] = n),
            (e[3] = o),
            (e[4] = u),
            (e[5] = l),
            e
          );
        }),
        (o.set = function (t, a, n, r, o, u, l) {
          return (
            (t[0] = a),
            (t[1] = n),
            (t[2] = r),
            (t[3] = o),
            (t[4] = u),
            (t[5] = l),
            t
          );
        }),
        (o.invert = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = a[4],
            e = a[5],
            M = n * u - r * o;
          return M
            ? ((M = 1 / M),
              (t[0] = u * M),
              (t[1] = -r * M),
              (t[2] = -o * M),
              (t[3] = n * M),
              (t[4] = (o * e - u * l) * M),
              (t[5] = (r * l - n * e) * M),
              t)
            : null;
        }),
        (o.determinant = function (t) {
          return t[0] * t[3] - t[1] * t[2];
        }),
        (o.multiply = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = n[0],
            i = n[1],
            c = n[2],
            h = n[3],
            S = n[4],
            I = n[5];
          return (
            (t[0] = r * s + u * i),
            (t[1] = o * s + l * i),
            (t[2] = r * c + u * h),
            (t[3] = o * c + l * h),
            (t[4] = r * S + u * I + e),
            (t[5] = o * S + l * I + M),
            t
          );
        }),
        (o.mul = o.multiply),
        (o.rotate = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = Math.sin(n),
            i = Math.cos(n);
          return (
            (t[0] = r * i + u * s),
            (t[1] = o * i + l * s),
            (t[2] = r * -s + u * i),
            (t[3] = o * -s + l * i),
            (t[4] = e),
            (t[5] = M),
            t
          );
        }),
        (o.scale = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = n[0],
            i = n[1];
          return (
            (t[0] = r * s),
            (t[1] = o * s),
            (t[2] = u * i),
            (t[3] = l * i),
            (t[4] = e),
            (t[5] = M),
            t
          );
        }),
        (o.translate = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = n[0],
            i = n[1];
          return (
            (t[0] = r),
            (t[1] = o),
            (t[2] = u),
            (t[3] = l),
            (t[4] = r * s + u * i + e),
            (t[5] = o * s + l * i + M),
            t
          );
        }),
        (o.fromRotation = function (t, a) {
          var n = Math.sin(a),
            r = Math.cos(a);
          return (
            (t[0] = r),
            (t[1] = n),
            (t[2] = -n),
            (t[3] = r),
            (t[4] = 0),
            (t[5] = 0),
            t
          );
        }),
        (o.fromScaling = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = a[1]),
            (t[4] = 0),
            (t[5] = 0),
            t
          );
        }),
        (o.fromTranslation = function (t, a) {
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 1),
            (t[4] = a[0]),
            (t[5] = a[1]),
            t
          );
        }),
        (o.str = function (t) {
          return (
            "mat2d(" +
            t[0] +
            ", " +
            t[1] +
            ", " +
            t[2] +
            ", " +
            t[3] +
            ", " +
            t[4] +
            ", " +
            t[5] +
            ")"
          );
        }),
        (o.frob = function (t) {
          return Math.sqrt(
            Math.pow(t[0], 2) +
              Math.pow(t[1], 2) +
              Math.pow(t[2], 2) +
              Math.pow(t[3], 2) +
              Math.pow(t[4], 2) +
              Math.pow(t[5], 2) +
              1,
          );
        }),
        (o.add = function (t, a, n) {
          return (
            (t[0] = a[0] + n[0]),
            (t[1] = a[1] + n[1]),
            (t[2] = a[2] + n[2]),
            (t[3] = a[3] + n[3]),
            (t[4] = a[4] + n[4]),
            (t[5] = a[5] + n[5]),
            t
          );
        }),
        (o.subtract = function (t, a, n) {
          return (
            (t[0] = a[0] - n[0]),
            (t[1] = a[1] - n[1]),
            (t[2] = a[2] - n[2]),
            (t[3] = a[3] - n[3]),
            (t[4] = a[4] - n[4]),
            (t[5] = a[5] - n[5]),
            t
          );
        }),
        (o.sub = o.subtract),
        (o.multiplyScalar = function (t, a, n) {
          return (
            (t[0] = a[0] * n),
            (t[1] = a[1] * n),
            (t[2] = a[2] * n),
            (t[3] = a[3] * n),
            (t[4] = a[4] * n),
            (t[5] = a[5] * n),
            t
          );
        }),
        (o.multiplyScalarAndAdd = function (t, a, n, r) {
          return (
            (t[0] = a[0] + n[0] * r),
            (t[1] = a[1] + n[1] * r),
            (t[2] = a[2] + n[2] * r),
            (t[3] = a[3] + n[3] * r),
            (t[4] = a[4] + n[4] * r),
            (t[5] = a[5] + n[5] * r),
            t
          );
        }),
        (o.exactEquals = function (t, a) {
          return (
            t[0] === a[0] &&
            t[1] === a[1] &&
            t[2] === a[2] &&
            t[3] === a[3] &&
            t[4] === a[4] &&
            t[5] === a[5]
          );
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = t[2],
            l = t[3],
            e = t[4],
            M = t[5],
            s = a[0],
            i = a[1],
            c = a[2],
            h = a[3],
            S = a[4],
            I = a[5];
          return (
            Math.abs(n - s) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) &&
            Math.abs(o - i) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(i)) &&
            Math.abs(u - c) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(c)) &&
            Math.abs(l - h) <=
              r.EPSILON * Math.max(1, Math.abs(l), Math.abs(h)) &&
            Math.abs(e - S) <=
              r.EPSILON * Math.max(1, Math.abs(e), Math.abs(S)) &&
            Math.abs(M - I) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(I))
          );
        }),
        (t.exports = o);
    },
    function (t, a, n) {
      var r = n(1),
        o = {};
      (o.create = function () {
        var t = new r.ARRAY_TYPE(9);
        return (
          (t[0] = 1),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 1),
          (t[5] = 0),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 1),
          t
        );
      }),
        (o.fromMat4 = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = a[2]),
            (t[3] = a[4]),
            (t[4] = a[5]),
            (t[5] = a[6]),
            (t[6] = a[8]),
            (t[7] = a[9]),
            (t[8] = a[10]),
            t
          );
        }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(9);
          return (
            (a[0] = t[0]),
            (a[1] = t[1]),
            (a[2] = t[2]),
            (a[3] = t[3]),
            (a[4] = t[4]),
            (a[5] = t[5]),
            (a[6] = t[6]),
            (a[7] = t[7]),
            (a[8] = t[8]),
            a
          );
        }),
        (o.copy = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = a[2]),
            (t[3] = a[3]),
            (t[4] = a[4]),
            (t[5] = a[5]),
            (t[6] = a[6]),
            (t[7] = a[7]),
            (t[8] = a[8]),
            t
          );
        }),
        (o.fromValues = function (t, a, n, o, u, l, e, M, s) {
          var i = new r.ARRAY_TYPE(9);
          return (
            (i[0] = t),
            (i[1] = a),
            (i[2] = n),
            (i[3] = o),
            (i[4] = u),
            (i[5] = l),
            (i[6] = e),
            (i[7] = M),
            (i[8] = s),
            i
          );
        }),
        (o.set = function (t, a, n, r, o, u, l, e, M, s) {
          return (
            (t[0] = a),
            (t[1] = n),
            (t[2] = r),
            (t[3] = o),
            (t[4] = u),
            (t[5] = l),
            (t[6] = e),
            (t[7] = M),
            (t[8] = s),
            t
          );
        }),
        (o.identity = function (t) {
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 1),
            (t[5] = 0),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 1),
            t
          );
        }),
        (o.transpose = function (t, a) {
          if (t === a) {
            var n = a[1],
              r = a[2],
              o = a[5];
            (t[1] = a[3]),
              (t[2] = a[6]),
              (t[3] = n),
              (t[5] = a[7]),
              (t[6] = r),
              (t[7] = o);
          } else
            (t[0] = a[0]),
              (t[1] = a[3]),
              (t[2] = a[6]),
              (t[3] = a[1]),
              (t[4] = a[4]),
              (t[5] = a[7]),
              (t[6] = a[2]),
              (t[7] = a[5]),
              (t[8] = a[8]);
          return t;
        }),
        (o.invert = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = a[4],
            e = a[5],
            M = a[6],
            s = a[7],
            i = a[8],
            c = i * l - e * s,
            h = -i * u + e * M,
            S = s * u - l * M,
            I = n * c + r * h + o * S;
          return I
            ? ((I = 1 / I),
              (t[0] = c * I),
              (t[1] = (-i * r + o * s) * I),
              (t[2] = (e * r - o * l) * I),
              (t[3] = h * I),
              (t[4] = (i * n - o * M) * I),
              (t[5] = (-e * n + o * u) * I),
              (t[6] = S * I),
              (t[7] = (-s * n + r * M) * I),
              (t[8] = (l * n - r * u) * I),
              t)
            : null;
        }),
        (o.adjoint = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = a[4],
            e = a[5],
            M = a[6],
            s = a[7],
            i = a[8];
          return (
            (t[0] = l * i - e * s),
            (t[1] = o * s - r * i),
            (t[2] = r * e - o * l),
            (t[3] = e * M - u * i),
            (t[4] = n * i - o * M),
            (t[5] = o * u - n * e),
            (t[6] = u * s - l * M),
            (t[7] = r * M - n * s),
            (t[8] = n * l - r * u),
            t
          );
        }),
        (o.determinant = function (t) {
          var a = t[0],
            n = t[1],
            r = t[2],
            o = t[3],
            u = t[4],
            l = t[5],
            e = t[6],
            M = t[7],
            s = t[8];
          return (
            a * (s * u - l * M) + n * (-s * o + l * e) + r * (M * o - u * e)
          );
        }),
        (o.multiply = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = a[6],
            i = a[7],
            c = a[8],
            h = n[0],
            S = n[1],
            I = n[2],
            f = n[3],
            x = n[4],
            D = n[5],
            F = n[6],
            m = n[7],
            d = n[8];
          return (
            (t[0] = h * r + S * l + I * s),
            (t[1] = h * o + S * e + I * i),
            (t[2] = h * u + S * M + I * c),
            (t[3] = f * r + x * l + D * s),
            (t[4] = f * o + x * e + D * i),
            (t[5] = f * u + x * M + D * c),
            (t[6] = F * r + m * l + d * s),
            (t[7] = F * o + m * e + d * i),
            (t[8] = F * u + m * M + d * c),
            t
          );
        }),
        (o.mul = o.multiply),
        (o.translate = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = a[6],
            i = a[7],
            c = a[8],
            h = n[0],
            S = n[1];
          return (
            (t[0] = r),
            (t[1] = o),
            (t[2] = u),
            (t[3] = l),
            (t[4] = e),
            (t[5] = M),
            (t[6] = h * r + S * l + s),
            (t[7] = h * o + S * e + i),
            (t[8] = h * u + S * M + c),
            t
          );
        }),
        (o.rotate = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = a[6],
            i = a[7],
            c = a[8],
            h = Math.sin(n),
            S = Math.cos(n);
          return (
            (t[0] = S * r + h * l),
            (t[1] = S * o + h * e),
            (t[2] = S * u + h * M),
            (t[3] = S * l - h * r),
            (t[4] = S * e - h * o),
            (t[5] = S * M - h * u),
            (t[6] = s),
            (t[7] = i),
            (t[8] = c),
            t
          );
        }),
        (o.scale = function (t, a, n) {
          var r = n[0],
            o = n[1];
          return (
            (t[0] = r * a[0]),
            (t[1] = r * a[1]),
            (t[2] = r * a[2]),
            (t[3] = o * a[3]),
            (t[4] = o * a[4]),
            (t[5] = o * a[5]),
            (t[6] = a[6]),
            (t[7] = a[7]),
            (t[8] = a[8]),
            t
          );
        }),
        (o.fromTranslation = function (t, a) {
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 1),
            (t[5] = 0),
            (t[6] = a[0]),
            (t[7] = a[1]),
            (t[8] = 1),
            t
          );
        }),
        (o.fromRotation = function (t, a) {
          var n = Math.sin(a),
            r = Math.cos(a);
          return (
            (t[0] = r),
            (t[1] = n),
            (t[2] = 0),
            (t[3] = -n),
            (t[4] = r),
            (t[5] = 0),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 1),
            t
          );
        }),
        (o.fromScaling = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = a[1]),
            (t[5] = 0),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 1),
            t
          );
        }),
        (o.fromMat2d = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = 0),
            (t[3] = a[2]),
            (t[4] = a[3]),
            (t[5] = 0),
            (t[6] = a[4]),
            (t[7] = a[5]),
            (t[8] = 1),
            t
          );
        }),
        (o.fromQuat = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = n + n,
            e = r + r,
            M = o + o,
            s = n * l,
            i = r * l,
            c = r * e,
            h = o * l,
            S = o * e,
            I = o * M,
            f = u * l,
            x = u * e,
            D = u * M;
          return (
            (t[0] = 1 - c - I),
            (t[3] = i - D),
            (t[6] = h + x),
            (t[1] = i + D),
            (t[4] = 1 - s - I),
            (t[7] = S - f),
            (t[2] = h - x),
            (t[5] = S + f),
            (t[8] = 1 - s - c),
            t
          );
        }),
        (o.normalFromMat4 = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = a[4],
            e = a[5],
            M = a[6],
            s = a[7],
            i = a[8],
            c = a[9],
            h = a[10],
            S = a[11],
            I = a[12],
            f = a[13],
            x = a[14],
            D = a[15],
            F = n * e - r * l,
            m = n * M - o * l,
            d = n * s - u * l,
            b = r * M - o * e,
            v = r * s - u * e,
            z = o * s - u * M,
            p = i * f - c * I,
            w = i * x - h * I,
            E = i * D - S * I,
            A = c * x - h * f,
            P = c * D - S * f,
            L = h * D - S * x,
            q = F * L - m * P + d * A + b * E - v * w + z * p;
          return q
            ? ((q = 1 / q),
              (t[0] = (e * L - M * P + s * A) * q),
              (t[1] = (M * E - l * L - s * w) * q),
              (t[2] = (l * P - e * E + s * p) * q),
              (t[3] = (o * P - r * L - u * A) * q),
              (t[4] = (n * L - o * E + u * w) * q),
              (t[5] = (r * E - n * P - u * p) * q),
              (t[6] = (f * z - x * v + D * b) * q),
              (t[7] = (x * d - I * z - D * m) * q),
              (t[8] = (I * v - f * d + D * F) * q),
              t)
            : null;
        }),
        (o.str = function (t) {
          return (
            "mat3(" +
            t[0] +
            ", " +
            t[1] +
            ", " +
            t[2] +
            ", " +
            t[3] +
            ", " +
            t[4] +
            ", " +
            t[5] +
            ", " +
            t[6] +
            ", " +
            t[7] +
            ", " +
            t[8] +
            ")"
          );
        }),
        (o.frob = function (t) {
          return Math.sqrt(
            Math.pow(t[0], 2) +
              Math.pow(t[1], 2) +
              Math.pow(t[2], 2) +
              Math.pow(t[3], 2) +
              Math.pow(t[4], 2) +
              Math.pow(t[5], 2) +
              Math.pow(t[6], 2) +
              Math.pow(t[7], 2) +
              Math.pow(t[8], 2),
          );
        }),
        (o.add = function (t, a, n) {
          return (
            (t[0] = a[0] + n[0]),
            (t[1] = a[1] + n[1]),
            (t[2] = a[2] + n[2]),
            (t[3] = a[3] + n[3]),
            (t[4] = a[4] + n[4]),
            (t[5] = a[5] + n[5]),
            (t[6] = a[6] + n[6]),
            (t[7] = a[7] + n[7]),
            (t[8] = a[8] + n[8]),
            t
          );
        }),
        (o.subtract = function (t, a, n) {
          return (
            (t[0] = a[0] - n[0]),
            (t[1] = a[1] - n[1]),
            (t[2] = a[2] - n[2]),
            (t[3] = a[3] - n[3]),
            (t[4] = a[4] - n[4]),
            (t[5] = a[5] - n[5]),
            (t[6] = a[6] - n[6]),
            (t[7] = a[7] - n[7]),
            (t[8] = a[8] - n[8]),
            t
          );
        }),
        (o.sub = o.subtract),
        (o.multiplyScalar = function (t, a, n) {
          return (
            (t[0] = a[0] * n),
            (t[1] = a[1] * n),
            (t[2] = a[2] * n),
            (t[3] = a[3] * n),
            (t[4] = a[4] * n),
            (t[5] = a[5] * n),
            (t[6] = a[6] * n),
            (t[7] = a[7] * n),
            (t[8] = a[8] * n),
            t
          );
        }),
        (o.multiplyScalarAndAdd = function (t, a, n, r) {
          return (
            (t[0] = a[0] + n[0] * r),
            (t[1] = a[1] + n[1] * r),
            (t[2] = a[2] + n[2] * r),
            (t[3] = a[3] + n[3] * r),
            (t[4] = a[4] + n[4] * r),
            (t[5] = a[5] + n[5] * r),
            (t[6] = a[6] + n[6] * r),
            (t[7] = a[7] + n[7] * r),
            (t[8] = a[8] + n[8] * r),
            t
          );
        }),
        (o.exactEquals = function (t, a) {
          return (
            t[0] === a[0] &&
            t[1] === a[1] &&
            t[2] === a[2] &&
            t[3] === a[3] &&
            t[4] === a[4] &&
            t[5] === a[5] &&
            t[6] === a[6] &&
            t[7] === a[7] &&
            t[8] === a[8]
          );
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = t[2],
            l = t[3],
            e = t[4],
            M = t[5],
            s = t[6],
            i = t[7],
            c = t[8],
            h = a[0],
            S = a[1],
            I = a[2],
            f = a[3],
            x = a[4],
            D = a[5],
            F = t[6],
            m = a[7],
            d = a[8];
          return (
            Math.abs(n - h) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(h)) &&
            Math.abs(o - S) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(S)) &&
            Math.abs(u - I) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(I)) &&
            Math.abs(l - f) <=
              r.EPSILON * Math.max(1, Math.abs(l), Math.abs(f)) &&
            Math.abs(e - x) <=
              r.EPSILON * Math.max(1, Math.abs(e), Math.abs(x)) &&
            Math.abs(M - D) <=
              r.EPSILON * Math.max(1, Math.abs(M), Math.abs(D)) &&
            Math.abs(s - F) <=
              r.EPSILON * Math.max(1, Math.abs(s), Math.abs(F)) &&
            Math.abs(i - m) <=
              r.EPSILON * Math.max(1, Math.abs(i), Math.abs(m)) &&
            Math.abs(c - d) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(d))
          );
        }),
        (t.exports = o);
    },
    function (t, a, n) {
      var r = n(1),
        o = { scalar: {}, SIMD: {} };
      (o.create = function () {
        var t = new r.ARRAY_TYPE(16);
        return (
          (t[0] = 1),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[5] = 1),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[10] = 1),
          (t[11] = 0),
          (t[12] = 0),
          (t[13] = 0),
          (t[14] = 0),
          (t[15] = 1),
          t
        );
      }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(16);
          return (
            (a[0] = t[0]),
            (a[1] = t[1]),
            (a[2] = t[2]),
            (a[3] = t[3]),
            (a[4] = t[4]),
            (a[5] = t[5]),
            (a[6] = t[6]),
            (a[7] = t[7]),
            (a[8] = t[8]),
            (a[9] = t[9]),
            (a[10] = t[10]),
            (a[11] = t[11]),
            (a[12] = t[12]),
            (a[13] = t[13]),
            (a[14] = t[14]),
            (a[15] = t[15]),
            a
          );
        }),
        (o.copy = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = a[2]),
            (t[3] = a[3]),
            (t[4] = a[4]),
            (t[5] = a[5]),
            (t[6] = a[6]),
            (t[7] = a[7]),
            (t[8] = a[8]),
            (t[9] = a[9]),
            (t[10] = a[10]),
            (t[11] = a[11]),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]),
            t
          );
        }),
        (o.fromValues = function (
          t,
          a,
          n,
          o,
          u,
          l,
          e,
          M,
          s,
          i,
          c,
          h,
          S,
          I,
          f,
          x,
        ) {
          var D = new r.ARRAY_TYPE(16);
          return (
            (D[0] = t),
            (D[1] = a),
            (D[2] = n),
            (D[3] = o),
            (D[4] = u),
            (D[5] = l),
            (D[6] = e),
            (D[7] = M),
            (D[8] = s),
            (D[9] = i),
            (D[10] = c),
            (D[11] = h),
            (D[12] = S),
            (D[13] = I),
            (D[14] = f),
            (D[15] = x),
            D
          );
        }),
        (o.set = function (t, a, n, r, o, u, l, e, M, s, i, c, h, S, I, f, x) {
          return (
            (t[0] = a),
            (t[1] = n),
            (t[2] = r),
            (t[3] = o),
            (t[4] = u),
            (t[5] = l),
            (t[6] = e),
            (t[7] = M),
            (t[8] = s),
            (t[9] = i),
            (t[10] = c),
            (t[11] = h),
            (t[12] = S),
            (t[13] = I),
            (t[14] = f),
            (t[15] = x),
            t
          );
        }),
        (o.identity = function (t) {
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        }),
        (o.scalar.transpose = function (t, a) {
          if (t === a) {
            var n = a[1],
              r = a[2],
              o = a[3],
              u = a[6],
              l = a[7],
              e = a[11];
            (t[1] = a[4]),
              (t[2] = a[8]),
              (t[3] = a[12]),
              (t[4] = n),
              (t[6] = a[9]),
              (t[7] = a[13]),
              (t[8] = r),
              (t[9] = u),
              (t[11] = a[14]),
              (t[12] = o),
              (t[13] = l),
              (t[14] = e);
          } else
            (t[0] = a[0]),
              (t[1] = a[4]),
              (t[2] = a[8]),
              (t[3] = a[12]),
              (t[4] = a[1]),
              (t[5] = a[5]),
              (t[6] = a[9]),
              (t[7] = a[13]),
              (t[8] = a[2]),
              (t[9] = a[6]),
              (t[10] = a[10]),
              (t[11] = a[14]),
              (t[12] = a[3]),
              (t[13] = a[7]),
              (t[14] = a[11]),
              (t[15] = a[15]);
          return t;
        }),
        (o.SIMD.transpose = function (t, a) {
          var n, r, o, u, l, e, M, s, i, c;
          return (
            (n = SIMD.Float32x4.load(a, 0)),
            (r = SIMD.Float32x4.load(a, 4)),
            (o = SIMD.Float32x4.load(a, 8)),
            (u = SIMD.Float32x4.load(a, 12)),
            (l = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5)),
            (e = SIMD.Float32x4.shuffle(o, u, 0, 1, 4, 5)),
            (M = SIMD.Float32x4.shuffle(l, e, 0, 2, 4, 6)),
            (s = SIMD.Float32x4.shuffle(l, e, 1, 3, 5, 7)),
            SIMD.Float32x4.store(t, 0, M),
            SIMD.Float32x4.store(t, 4, s),
            (l = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7)),
            (e = SIMD.Float32x4.shuffle(o, u, 2, 3, 6, 7)),
            (i = SIMD.Float32x4.shuffle(l, e, 0, 2, 4, 6)),
            (c = SIMD.Float32x4.shuffle(l, e, 1, 3, 5, 7)),
            SIMD.Float32x4.store(t, 8, i),
            SIMD.Float32x4.store(t, 12, c),
            t
          );
        }),
        (o.transpose = r.USE_SIMD ? o.SIMD.transpose : o.scalar.transpose),
        (o.scalar.invert = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = a[4],
            e = a[5],
            M = a[6],
            s = a[7],
            i = a[8],
            c = a[9],
            h = a[10],
            S = a[11],
            I = a[12],
            f = a[13],
            x = a[14],
            D = a[15],
            F = n * e - r * l,
            m = n * M - o * l,
            d = n * s - u * l,
            b = r * M - o * e,
            v = r * s - u * e,
            z = o * s - u * M,
            p = i * f - c * I,
            w = i * x - h * I,
            E = i * D - S * I,
            A = c * x - h * f,
            P = c * D - S * f,
            L = h * D - S * x,
            q = F * L - m * P + d * A + b * E - v * w + z * p;
          return q
            ? ((q = 1 / q),
              (t[0] = (e * L - M * P + s * A) * q),
              (t[1] = (o * P - r * L - u * A) * q),
              (t[2] = (f * z - x * v + D * b) * q),
              (t[3] = (h * v - c * z - S * b) * q),
              (t[4] = (M * E - l * L - s * w) * q),
              (t[5] = (n * L - o * E + u * w) * q),
              (t[6] = (x * d - I * z - D * m) * q),
              (t[7] = (i * z - h * d + S * m) * q),
              (t[8] = (l * P - e * E + s * p) * q),
              (t[9] = (r * E - n * P - u * p) * q),
              (t[10] = (I * v - f * d + D * F) * q),
              (t[11] = (c * d - i * v - S * F) * q),
              (t[12] = (e * w - l * A - M * p) * q),
              (t[13] = (n * A - r * w + o * p) * q),
              (t[14] = (f * m - I * b - x * F) * q),
              (t[15] = (i * b - c * m + h * F) * q),
              t)
            : null;
        }),
        (o.SIMD.invert = function (t, a) {
          var n,
            r,
            o,
            u,
            l,
            e,
            M,
            s,
            i,
            c,
            h = SIMD.Float32x4.load(a, 0),
            S = SIMD.Float32x4.load(a, 4),
            I = SIMD.Float32x4.load(a, 8),
            f = SIMD.Float32x4.load(a, 12);
          return (
            (l = SIMD.Float32x4.shuffle(h, S, 0, 1, 4, 5)),
            (r = SIMD.Float32x4.shuffle(I, f, 0, 1, 4, 5)),
            (n = SIMD.Float32x4.shuffle(l, r, 0, 2, 4, 6)),
            (r = SIMD.Float32x4.shuffle(r, l, 1, 3, 5, 7)),
            (l = SIMD.Float32x4.shuffle(h, S, 2, 3, 6, 7)),
            (u = SIMD.Float32x4.shuffle(I, f, 2, 3, 6, 7)),
            (o = SIMD.Float32x4.shuffle(l, u, 0, 2, 4, 6)),
            (u = SIMD.Float32x4.shuffle(u, l, 1, 3, 5, 7)),
            (l = SIMD.Float32x4.mul(o, u)),
            (l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2)),
            (e = SIMD.Float32x4.mul(r, l)),
            (M = SIMD.Float32x4.mul(n, l)),
            (l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1)),
            (e = SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, l), e)),
            (M = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), M)),
            (M = SIMD.Float32x4.swizzle(M, 2, 3, 0, 1)),
            (l = SIMD.Float32x4.mul(r, o)),
            (l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2)),
            (e = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), e)),
            (i = SIMD.Float32x4.mul(n, l)),
            (l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1)),
            (e = SIMD.Float32x4.sub(e, SIMD.Float32x4.mul(u, l))),
            (i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), i)),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (l = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r, 2, 3, 0, 1), u)),
            (l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2)),
            (o = SIMD.Float32x4.swizzle(o, 2, 3, 0, 1)),
            (e = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, l), e)),
            (s = SIMD.Float32x4.mul(n, l)),
            (l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1)),
            (e = SIMD.Float32x4.sub(e, SIMD.Float32x4.mul(o, l))),
            (s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), s)),
            (s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1)),
            (l = SIMD.Float32x4.mul(n, r)),
            (l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2)),
            (s = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), s)),
            (i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, l), i)),
            (l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1)),
            (s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, l), s)),
            (i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(o, l))),
            (l = SIMD.Float32x4.mul(n, u)),
            (l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2)),
            (M = SIMD.Float32x4.sub(M, SIMD.Float32x4.mul(o, l))),
            (s = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, l), s)),
            (l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1)),
            (M = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, l), M)),
            (s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(r, l))),
            (l = SIMD.Float32x4.mul(n, o)),
            (l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2)),
            (M = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), M)),
            (i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(r, l))),
            (l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1)),
            (M = SIMD.Float32x4.sub(M, SIMD.Float32x4.mul(u, l))),
            (i = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, l), i)),
            (c = SIMD.Float32x4.mul(n, e)),
            (c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 2, 3, 0, 1), c)),
            (c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 1, 0, 3, 2), c)),
            (l = SIMD.Float32x4.reciprocalApproximation(c)),
            (c = SIMD.Float32x4.sub(
              SIMD.Float32x4.add(l, l),
              SIMD.Float32x4.mul(c, SIMD.Float32x4.mul(l, l)),
            )),
            (c = SIMD.Float32x4.swizzle(c, 0, 0, 0, 0))
              ? (SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(c, e)),
                SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(c, M)),
                SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(c, s)),
                SIMD.Float32x4.store(t, 12, SIMD.Float32x4.mul(c, i)),
                t)
              : null
          );
        }),
        (o.invert = r.USE_SIMD ? o.SIMD.invert : o.scalar.invert),
        (o.scalar.adjoint = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = a[4],
            e = a[5],
            M = a[6],
            s = a[7],
            i = a[8],
            c = a[9],
            h = a[10],
            S = a[11],
            I = a[12],
            f = a[13],
            x = a[14],
            D = a[15];
          return (
            (t[0] =
              e * (h * D - S * x) - c * (M * D - s * x) + f * (M * S - s * h)),
            (t[1] = -(
              r * (h * D - S * x) -
              c * (o * D - u * x) +
              f * (o * S - u * h)
            )),
            (t[2] =
              r * (M * D - s * x) - e * (o * D - u * x) + f * (o * s - u * M)),
            (t[3] = -(
              r * (M * S - s * h) -
              e * (o * S - u * h) +
              c * (o * s - u * M)
            )),
            (t[4] = -(
              l * (h * D - S * x) -
              i * (M * D - s * x) +
              I * (M * S - s * h)
            )),
            (t[5] =
              n * (h * D - S * x) - i * (o * D - u * x) + I * (o * S - u * h)),
            (t[6] = -(
              n * (M * D - s * x) -
              l * (o * D - u * x) +
              I * (o * s - u * M)
            )),
            (t[7] =
              n * (M * S - s * h) - l * (o * S - u * h) + i * (o * s - u * M)),
            (t[8] =
              l * (c * D - S * f) - i * (e * D - s * f) + I * (e * S - s * c)),
            (t[9] = -(
              n * (c * D - S * f) -
              i * (r * D - u * f) +
              I * (r * S - u * c)
            )),
            (t[10] =
              n * (e * D - s * f) - l * (r * D - u * f) + I * (r * s - u * e)),
            (t[11] = -(
              n * (e * S - s * c) -
              l * (r * S - u * c) +
              i * (r * s - u * e)
            )),
            (t[12] = -(
              l * (c * x - h * f) -
              i * (e * x - M * f) +
              I * (e * h - M * c)
            )),
            (t[13] =
              n * (c * x - h * f) - i * (r * x - o * f) + I * (r * h - o * c)),
            (t[14] = -(
              n * (e * x - M * f) -
              l * (r * x - o * f) +
              I * (r * M - o * e)
            )),
            (t[15] =
              n * (e * h - M * c) - l * (r * h - o * c) + i * (r * M - o * e)),
            t
          );
        }),
        (o.SIMD.adjoint = function (t, a) {
          var n,
            r,
            o,
            u,
            l,
            e,
            M,
            s,
            i,
            c,
            h,
            S,
            I,
            n = SIMD.Float32x4.load(a, 0),
            r = SIMD.Float32x4.load(a, 4),
            o = SIMD.Float32x4.load(a, 8),
            u = SIMD.Float32x4.load(a, 12);
          return (
            (i = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5)),
            (e = SIMD.Float32x4.shuffle(o, u, 0, 1, 4, 5)),
            (l = SIMD.Float32x4.shuffle(i, e, 0, 2, 4, 6)),
            (e = SIMD.Float32x4.shuffle(e, i, 1, 3, 5, 7)),
            (i = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7)),
            (s = SIMD.Float32x4.shuffle(o, u, 2, 3, 6, 7)),
            (M = SIMD.Float32x4.shuffle(i, s, 0, 2, 4, 6)),
            (s = SIMD.Float32x4.shuffle(s, i, 1, 3, 5, 7)),
            (i = SIMD.Float32x4.mul(M, s)),
            (i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2)),
            (c = SIMD.Float32x4.mul(e, i)),
            (h = SIMD.Float32x4.mul(l, i)),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(e, i), c)),
            (h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), h)),
            (h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1)),
            (i = SIMD.Float32x4.mul(e, M)),
            (i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2)),
            (c = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), c)),
            (I = SIMD.Float32x4.mul(l, i)),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(s, i))),
            (I = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), I)),
            (I = SIMD.Float32x4.swizzle(I, 2, 3, 0, 1)),
            (i = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 2, 3, 0, 1), s)),
            (i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2)),
            (M = SIMD.Float32x4.swizzle(M, 2, 3, 0, 1)),
            (c = SIMD.Float32x4.add(SIMD.Float32x4.mul(M, i), c)),
            (S = SIMD.Float32x4.mul(l, i)),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(M, i))),
            (S = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), S)),
            (S = SIMD.Float32x4.swizzle(S, 2, 3, 0, 1)),
            (i = SIMD.Float32x4.mul(l, e)),
            (i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2)),
            (S = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), S)),
            (I = SIMD.Float32x4.sub(SIMD.Float32x4.mul(M, i), I)),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (S = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, i), S)),
            (I = SIMD.Float32x4.sub(I, SIMD.Float32x4.mul(M, i))),
            (i = SIMD.Float32x4.mul(l, s)),
            (i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2)),
            (h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(M, i))),
            (S = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, i), S)),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (h = SIMD.Float32x4.add(SIMD.Float32x4.mul(M, i), h)),
            (S = SIMD.Float32x4.sub(S, SIMD.Float32x4.mul(e, i))),
            (i = SIMD.Float32x4.mul(l, M)),
            (i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2)),
            (h = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), h)),
            (I = SIMD.Float32x4.sub(I, SIMD.Float32x4.mul(e, i))),
            (i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1)),
            (h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(s, i))),
            (I = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, i), I)),
            SIMD.Float32x4.store(t, 0, c),
            SIMD.Float32x4.store(t, 4, h),
            SIMD.Float32x4.store(t, 8, S),
            SIMD.Float32x4.store(t, 12, I),
            t
          );
        }),
        (o.adjoint = r.USE_SIMD ? o.SIMD.adjoint : o.scalar.adjoint),
        (o.determinant = function (t) {
          var a = t[0],
            n = t[1],
            r = t[2],
            o = t[3],
            u = t[4],
            l = t[5],
            e = t[6],
            M = t[7],
            s = t[8],
            i = t[9],
            c = t[10],
            h = t[11],
            S = t[12],
            I = t[13],
            f = t[14],
            x = t[15],
            D = a * l - n * u,
            F = a * e - r * u,
            m = a * M - o * u,
            d = n * e - r * l,
            b = n * M - o * l,
            v = r * M - o * e,
            z = s * I - i * S,
            p = s * f - c * S,
            w = s * x - h * S,
            E = i * f - c * I,
            A = i * x - h * I,
            P = c * x - h * f;
          return D * P - F * A + m * E + d * w - b * p + v * z;
        }),
        (o.SIMD.multiply = function (t, a, n) {
          var r = SIMD.Float32x4.load(a, 0),
            o = SIMD.Float32x4.load(a, 4),
            u = SIMD.Float32x4.load(a, 8),
            l = SIMD.Float32x4.load(a, 12),
            e = SIMD.Float32x4.load(n, 0),
            M = SIMD.Float32x4.add(
              SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 0, 0, 0, 0), r),
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 1, 1, 1, 1), o),
                SIMD.Float32x4.add(
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 2, 2, 2, 2), u),
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 3, 3, 3, 3), l),
                ),
              ),
            );
          SIMD.Float32x4.store(t, 0, M);
          var s = SIMD.Float32x4.load(n, 4),
            i = SIMD.Float32x4.add(
              SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 0, 0, 0, 0), r),
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 1, 1, 1, 1), o),
                SIMD.Float32x4.add(
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 2, 2, 2), u),
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 3, 3, 3, 3), l),
                ),
              ),
            );
          SIMD.Float32x4.store(t, 4, i);
          var c = SIMD.Float32x4.load(n, 8),
            h = SIMD.Float32x4.add(
              SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 0, 0, 0, 0), r),
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 1, 1, 1, 1), o),
                SIMD.Float32x4.add(
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 2, 2, 2, 2), u),
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 3, 3, 3, 3), l),
                ),
              ),
            );
          SIMD.Float32x4.store(t, 8, h);
          var S = SIMD.Float32x4.load(n, 12),
            I = SIMD.Float32x4.add(
              SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 0, 0, 0, 0), r),
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 1, 1, 1, 1), o),
                SIMD.Float32x4.add(
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 2, 2, 2, 2), u),
                  SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 3, 3, 3, 3), l),
                ),
              ),
            );
          return SIMD.Float32x4.store(t, 12, I), t;
        }),
        (o.scalar.multiply = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = a[4],
            M = a[5],
            s = a[6],
            i = a[7],
            c = a[8],
            h = a[9],
            S = a[10],
            I = a[11],
            f = a[12],
            x = a[13],
            D = a[14],
            F = a[15],
            m = n[0],
            d = n[1],
            b = n[2],
            v = n[3];
          return (
            (t[0] = m * r + d * e + b * c + v * f),
            (t[1] = m * o + d * M + b * h + v * x),
            (t[2] = m * u + d * s + b * S + v * D),
            (t[3] = m * l + d * i + b * I + v * F),
            (m = n[4]),
            (d = n[5]),
            (b = n[6]),
            (v = n[7]),
            (t[4] = m * r + d * e + b * c + v * f),
            (t[5] = m * o + d * M + b * h + v * x),
            (t[6] = m * u + d * s + b * S + v * D),
            (t[7] = m * l + d * i + b * I + v * F),
            (m = n[8]),
            (d = n[9]),
            (b = n[10]),
            (v = n[11]),
            (t[8] = m * r + d * e + b * c + v * f),
            (t[9] = m * o + d * M + b * h + v * x),
            (t[10] = m * u + d * s + b * S + v * D),
            (t[11] = m * l + d * i + b * I + v * F),
            (m = n[12]),
            (d = n[13]),
            (b = n[14]),
            (v = n[15]),
            (t[12] = m * r + d * e + b * c + v * f),
            (t[13] = m * o + d * M + b * h + v * x),
            (t[14] = m * u + d * s + b * S + v * D),
            (t[15] = m * l + d * i + b * I + v * F),
            t
          );
        }),
        (o.multiply = r.USE_SIMD ? o.SIMD.multiply : o.scalar.multiply),
        (o.mul = o.multiply),
        (o.scalar.translate = function (t, a, n) {
          var r,
            o,
            u,
            l,
            e,
            M,
            s,
            i,
            c,
            h,
            S,
            I,
            f = n[0],
            x = n[1],
            D = n[2];
          return (
            a === t
              ? ((t[12] = a[0] * f + a[4] * x + a[8] * D + a[12]),
                (t[13] = a[1] * f + a[5] * x + a[9] * D + a[13]),
                (t[14] = a[2] * f + a[6] * x + a[10] * D + a[14]),
                (t[15] = a[3] * f + a[7] * x + a[11] * D + a[15]))
              : ((r = a[0]),
                (o = a[1]),
                (u = a[2]),
                (l = a[3]),
                (e = a[4]),
                (M = a[5]),
                (s = a[6]),
                (i = a[7]),
                (c = a[8]),
                (h = a[9]),
                (S = a[10]),
                (I = a[11]),
                (t[0] = r),
                (t[1] = o),
                (t[2] = u),
                (t[3] = l),
                (t[4] = e),
                (t[5] = M),
                (t[6] = s),
                (t[7] = i),
                (t[8] = c),
                (t[9] = h),
                (t[10] = S),
                (t[11] = I),
                (t[12] = r * f + e * x + c * D + a[12]),
                (t[13] = o * f + M * x + h * D + a[13]),
                (t[14] = u * f + s * x + S * D + a[14]),
                (t[15] = l * f + i * x + I * D + a[15])),
            t
          );
        }),
        (o.SIMD.translate = function (t, a, n) {
          var r = SIMD.Float32x4.load(a, 0),
            o = SIMD.Float32x4.load(a, 4),
            u = SIMD.Float32x4.load(a, 8),
            l = SIMD.Float32x4.load(a, 12),
            e = SIMD.Float32x4(n[0], n[1], n[2], 0);
          a !== t &&
            ((t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = a[2]),
            (t[3] = a[3]),
            (t[4] = a[4]),
            (t[5] = a[5]),
            (t[6] = a[6]),
            (t[7] = a[7]),
            (t[8] = a[8]),
            (t[9] = a[9]),
            (t[10] = a[10]),
            (t[11] = a[11])),
            (r = SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(e, 0, 0, 0, 0))),
            (o = SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(e, 1, 1, 1, 1))),
            (u = SIMD.Float32x4.mul(u, SIMD.Float32x4.swizzle(e, 2, 2, 2, 2)));
          var M = SIMD.Float32x4.add(
            r,
            SIMD.Float32x4.add(o, SIMD.Float32x4.add(u, l)),
          );
          return SIMD.Float32x4.store(t, 12, M), t;
        }),
        (o.translate = r.USE_SIMD ? o.SIMD.translate : o.scalar.translate),
        (o.scalar.scale = function (t, a, n) {
          var r = n[0],
            o = n[1],
            u = n[2];
          return (
            (t[0] = a[0] * r),
            (t[1] = a[1] * r),
            (t[2] = a[2] * r),
            (t[3] = a[3] * r),
            (t[4] = a[4] * o),
            (t[5] = a[5] * o),
            (t[6] = a[6] * o),
            (t[7] = a[7] * o),
            (t[8] = a[8] * u),
            (t[9] = a[9] * u),
            (t[10] = a[10] * u),
            (t[11] = a[11] * u),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]),
            t
          );
        }),
        (o.SIMD.scale = function (t, a, n) {
          var r,
            o,
            u,
            l = SIMD.Float32x4(n[0], n[1], n[2], 0);
          return (
            (r = SIMD.Float32x4.load(a, 0)),
            SIMD.Float32x4.store(
              t,
              0,
              SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(l, 0, 0, 0, 0)),
            ),
            (o = SIMD.Float32x4.load(a, 4)),
            SIMD.Float32x4.store(
              t,
              4,
              SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(l, 1, 1, 1, 1)),
            ),
            (u = SIMD.Float32x4.load(a, 8)),
            SIMD.Float32x4.store(
              t,
              8,
              SIMD.Float32x4.mul(u, SIMD.Float32x4.swizzle(l, 2, 2, 2, 2)),
            ),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]),
            t
          );
        }),
        (o.scale = r.USE_SIMD ? o.SIMD.scale : o.scalar.scale),
        (o.rotate = function (t, a, n, o) {
          var u,
            l,
            e,
            M,
            s,
            i,
            c,
            h,
            S,
            I,
            f,
            x,
            D,
            F,
            m,
            d,
            b,
            v,
            z,
            p,
            w,
            E,
            A,
            P,
            L = o[0],
            q = o[1],
            R = o[2],
            N = Math.sqrt(L * L + q * q + R * R);
          return Math.abs(N) < r.EPSILON
            ? null
            : ((N = 1 / N),
              (L *= N),
              (q *= N),
              (R *= N),
              (u = Math.sin(n)),
              (l = Math.cos(n)),
              (e = 1 - l),
              (M = a[0]),
              (s = a[1]),
              (i = a[2]),
              (c = a[3]),
              (h = a[4]),
              (S = a[5]),
              (I = a[6]),
              (f = a[7]),
              (x = a[8]),
              (D = a[9]),
              (F = a[10]),
              (m = a[11]),
              (d = L * L * e + l),
              (b = q * L * e + R * u),
              (v = R * L * e - q * u),
              (z = L * q * e - R * u),
              (p = q * q * e + l),
              (w = R * q * e + L * u),
              (E = L * R * e + q * u),
              (A = q * R * e - L * u),
              (P = R * R * e + l),
              (t[0] = M * d + h * b + x * v),
              (t[1] = s * d + S * b + D * v),
              (t[2] = i * d + I * b + F * v),
              (t[3] = c * d + f * b + m * v),
              (t[4] = M * z + h * p + x * w),
              (t[5] = s * z + S * p + D * w),
              (t[6] = i * z + I * p + F * w),
              (t[7] = c * z + f * p + m * w),
              (t[8] = M * E + h * A + x * P),
              (t[9] = s * E + S * A + D * P),
              (t[10] = i * E + I * A + F * P),
              (t[11] = c * E + f * A + m * P),
              a !== t &&
                ((t[12] = a[12]),
                (t[13] = a[13]),
                (t[14] = a[14]),
                (t[15] = a[15])),
              t);
        }),
        (o.scalar.rotateX = function (t, a, n) {
          var r = Math.sin(n),
            o = Math.cos(n),
            u = a[4],
            l = a[5],
            e = a[6],
            M = a[7],
            s = a[8],
            i = a[9],
            c = a[10],
            h = a[11];
          return (
            a !== t &&
              ((t[0] = a[0]),
              (t[1] = a[1]),
              (t[2] = a[2]),
              (t[3] = a[3]),
              (t[12] = a[12]),
              (t[13] = a[13]),
              (t[14] = a[14]),
              (t[15] = a[15])),
            (t[4] = u * o + s * r),
            (t[5] = l * o + i * r),
            (t[6] = e * o + c * r),
            (t[7] = M * o + h * r),
            (t[8] = s * o - u * r),
            (t[9] = i * o - l * r),
            (t[10] = c * o - e * r),
            (t[11] = h * o - M * r),
            t
          );
        }),
        (o.SIMD.rotateX = function (t, a, n) {
          var r = SIMD.Float32x4.splat(Math.sin(n)),
            o = SIMD.Float32x4.splat(Math.cos(n));
          a !== t &&
            ((t[0] = a[0]),
            (t[1] = a[1]),
            (t[2] = a[2]),
            (t[3] = a[3]),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]));
          var u = SIMD.Float32x4.load(a, 4),
            l = SIMD.Float32x4.load(a, 8);
          return (
            SIMD.Float32x4.store(
              t,
              4,
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(u, o),
                SIMD.Float32x4.mul(l, r),
              ),
            ),
            SIMD.Float32x4.store(
              t,
              8,
              SIMD.Float32x4.sub(
                SIMD.Float32x4.mul(l, o),
                SIMD.Float32x4.mul(u, r),
              ),
            ),
            t
          );
        }),
        (o.rotateX = r.USE_SIMD ? o.SIMD.rotateX : o.scalar.rotateX),
        (o.scalar.rotateY = function (t, a, n) {
          var r = Math.sin(n),
            o = Math.cos(n),
            u = a[0],
            l = a[1],
            e = a[2],
            M = a[3],
            s = a[8],
            i = a[9],
            c = a[10],
            h = a[11];
          return (
            a !== t &&
              ((t[4] = a[4]),
              (t[5] = a[5]),
              (t[6] = a[6]),
              (t[7] = a[7]),
              (t[12] = a[12]),
              (t[13] = a[13]),
              (t[14] = a[14]),
              (t[15] = a[15])),
            (t[0] = u * o - s * r),
            (t[1] = l * o - i * r),
            (t[2] = e * o - c * r),
            (t[3] = M * o - h * r),
            (t[8] = u * r + s * o),
            (t[9] = l * r + i * o),
            (t[10] = e * r + c * o),
            (t[11] = M * r + h * o),
            t
          );
        }),
        (o.SIMD.rotateY = function (t, a, n) {
          var r = SIMD.Float32x4.splat(Math.sin(n)),
            o = SIMD.Float32x4.splat(Math.cos(n));
          a !== t &&
            ((t[4] = a[4]),
            (t[5] = a[5]),
            (t[6] = a[6]),
            (t[7] = a[7]),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]));
          var u = SIMD.Float32x4.load(a, 0),
            l = SIMD.Float32x4.load(a, 8);
          return (
            SIMD.Float32x4.store(
              t,
              0,
              SIMD.Float32x4.sub(
                SIMD.Float32x4.mul(u, o),
                SIMD.Float32x4.mul(l, r),
              ),
            ),
            SIMD.Float32x4.store(
              t,
              8,
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(u, r),
                SIMD.Float32x4.mul(l, o),
              ),
            ),
            t
          );
        }),
        (o.rotateY = r.USE_SIMD ? o.SIMD.rotateY : o.scalar.rotateY),
        (o.scalar.rotateZ = function (t, a, n) {
          var r = Math.sin(n),
            o = Math.cos(n),
            u = a[0],
            l = a[1],
            e = a[2],
            M = a[3],
            s = a[4],
            i = a[5],
            c = a[6],
            h = a[7];
          return (
            a !== t &&
              ((t[8] = a[8]),
              (t[9] = a[9]),
              (t[10] = a[10]),
              (t[11] = a[11]),
              (t[12] = a[12]),
              (t[13] = a[13]),
              (t[14] = a[14]),
              (t[15] = a[15])),
            (t[0] = u * o + s * r),
            (t[1] = l * o + i * r),
            (t[2] = e * o + c * r),
            (t[3] = M * o + h * r),
            (t[4] = s * o - u * r),
            (t[5] = i * o - l * r),
            (t[6] = c * o - e * r),
            (t[7] = h * o - M * r),
            t
          );
        }),
        (o.SIMD.rotateZ = function (t, a, n) {
          var r = SIMD.Float32x4.splat(Math.sin(n)),
            o = SIMD.Float32x4.splat(Math.cos(n));
          a !== t &&
            ((t[8] = a[8]),
            (t[9] = a[9]),
            (t[10] = a[10]),
            (t[11] = a[11]),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]));
          var u = SIMD.Float32x4.load(a, 0),
            l = SIMD.Float32x4.load(a, 4);
          return (
            SIMD.Float32x4.store(
              t,
              0,
              SIMD.Float32x4.add(
                SIMD.Float32x4.mul(u, o),
                SIMD.Float32x4.mul(l, r),
              ),
            ),
            SIMD.Float32x4.store(
              t,
              4,
              SIMD.Float32x4.sub(
                SIMD.Float32x4.mul(l, o),
                SIMD.Float32x4.mul(u, r),
              ),
            ),
            t
          );
        }),
        (o.rotateZ = r.USE_SIMD ? o.SIMD.rotateZ : o.scalar.rotateZ),
        (o.fromTranslation = function (t, a) {
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (t[12] = a[0]),
            (t[13] = a[1]),
            (t[14] = a[2]),
            (t[15] = 1),
            t
          );
        }),
        (o.fromScaling = function (t, a) {
          return (
            (t[0] = a[0]),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = a[1]),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = a[2]),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        }),
        (o.fromRotation = function (t, a, n) {
          var o,
            u,
            l,
            e = n[0],
            M = n[1],
            s = n[2],
            i = Math.sqrt(e * e + M * M + s * s);
          return Math.abs(i) < r.EPSILON
            ? null
            : ((i = 1 / i),
              (e *= i),
              (M *= i),
              (s *= i),
              (o = Math.sin(a)),
              (u = Math.cos(a)),
              (l = 1 - u),
              (t[0] = e * e * l + u),
              (t[1] = M * e * l + s * o),
              (t[2] = s * e * l - M * o),
              (t[3] = 0),
              (t[4] = e * M * l - s * o),
              (t[5] = M * M * l + u),
              (t[6] = s * M * l + e * o),
              (t[7] = 0),
              (t[8] = e * s * l + M * o),
              (t[9] = M * s * l - e * o),
              (t[10] = s * s * l + u),
              (t[11] = 0),
              (t[12] = 0),
              (t[13] = 0),
              (t[14] = 0),
              (t[15] = 1),
              t);
        }),
        (o.fromXRotation = function (t, a) {
          var n = Math.sin(a),
            r = Math.cos(a);
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = r),
            (t[6] = n),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = -n),
            (t[10] = r),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        }),
        (o.fromYRotation = function (t, a) {
          var n = Math.sin(a),
            r = Math.cos(a);
          return (
            (t[0] = r),
            (t[1] = 0),
            (t[2] = -n),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = n),
            (t[9] = 0),
            (t[10] = r),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        }),
        (o.fromZRotation = function (t, a) {
          var n = Math.sin(a),
            r = Math.cos(a);
          return (
            (t[0] = r),
            (t[1] = n),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = -n),
            (t[5] = r),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        }),
        (o.fromRotationTranslation = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = r + r,
            M = o + o,
            s = u + u,
            i = r * e,
            c = r * M,
            h = r * s,
            S = o * M,
            I = o * s,
            f = u * s,
            x = l * e,
            D = l * M,
            F = l * s;
          return (
            (t[0] = 1 - (S + f)),
            (t[1] = c + F),
            (t[2] = h - D),
            (t[3] = 0),
            (t[4] = c - F),
            (t[5] = 1 - (i + f)),
            (t[6] = I + x),
            (t[7] = 0),
            (t[8] = h + D),
            (t[9] = I - x),
            (t[10] = 1 - (i + S)),
            (t[11] = 0),
            (t[12] = n[0]),
            (t[13] = n[1]),
            (t[14] = n[2]),
            (t[15] = 1),
            t
          );
        }),
        (o.getTranslation = function (t, a) {
          return (t[0] = a[12]), (t[1] = a[13]), (t[2] = a[14]), t;
        }),
        (o.getRotation = function (t, a) {
          var n = a[0] + a[5] + a[10],
            r = 0;
          return (
            n > 0
              ? ((r = 2 * Math.sqrt(n + 1)),
                (t[3] = 0.25 * r),
                (t[0] = (a[6] - a[9]) / r),
                (t[1] = (a[8] - a[2]) / r),
                (t[2] = (a[1] - a[4]) / r))
              : (a[0] > a[5]) & (a[0] > a[10])
                ? ((r = 2 * Math.sqrt(1 + a[0] - a[5] - a[10])),
                  (t[3] = (a[6] - a[9]) / r),
                  (t[0] = 0.25 * r),
                  (t[1] = (a[1] + a[4]) / r),
                  (t[2] = (a[8] + a[2]) / r))
                : a[5] > a[10]
                  ? ((r = 2 * Math.sqrt(1 + a[5] - a[0] - a[10])),
                    (t[3] = (a[8] - a[2]) / r),
                    (t[0] = (a[1] + a[4]) / r),
                    (t[1] = 0.25 * r),
                    (t[2] = (a[6] + a[9]) / r))
                  : ((r = 2 * Math.sqrt(1 + a[10] - a[0] - a[5])),
                    (t[3] = (a[1] - a[4]) / r),
                    (t[0] = (a[8] + a[2]) / r),
                    (t[1] = (a[6] + a[9]) / r),
                    (t[2] = 0.25 * r)),
            t
          );
        }),
        (o.fromRotationTranslationScale = function (t, a, n, r) {
          var o = a[0],
            u = a[1],
            l = a[2],
            e = a[3],
            M = o + o,
            s = u + u,
            i = l + l,
            c = o * M,
            h = o * s,
            S = o * i,
            I = u * s,
            f = u * i,
            x = l * i,
            D = e * M,
            F = e * s,
            m = e * i,
            d = r[0],
            b = r[1],
            v = r[2];
          return (
            (t[0] = (1 - (I + x)) * d),
            (t[1] = (h + m) * d),
            (t[2] = (S - F) * d),
            (t[3] = 0),
            (t[4] = (h - m) * b),
            (t[5] = (1 - (c + x)) * b),
            (t[6] = (f + D) * b),
            (t[7] = 0),
            (t[8] = (S + F) * v),
            (t[9] = (f - D) * v),
            (t[10] = (1 - (c + I)) * v),
            (t[11] = 0),
            (t[12] = n[0]),
            (t[13] = n[1]),
            (t[14] = n[2]),
            (t[15] = 1),
            t
          );
        }),
        (o.fromRotationTranslationScaleOrigin = function (t, a, n, r, o) {
          var u = a[0],
            l = a[1],
            e = a[2],
            M = a[3],
            s = u + u,
            i = l + l,
            c = e + e,
            h = u * s,
            S = u * i,
            I = u * c,
            f = l * i,
            x = l * c,
            D = e * c,
            F = M * s,
            m = M * i,
            d = M * c,
            b = r[0],
            v = r[1],
            z = r[2],
            p = o[0],
            w = o[1],
            E = o[2];
          return (
            (t[0] = (1 - (f + D)) * b),
            (t[1] = (S + d) * b),
            (t[2] = (I - m) * b),
            (t[3] = 0),
            (t[4] = (S - d) * v),
            (t[5] = (1 - (h + D)) * v),
            (t[6] = (x + F) * v),
            (t[7] = 0),
            (t[8] = (I + m) * z),
            (t[9] = (x - F) * z),
            (t[10] = (1 - (h + f)) * z),
            (t[11] = 0),
            (t[12] = n[0] + p - (t[0] * p + t[4] * w + t[8] * E)),
            (t[13] = n[1] + w - (t[1] * p + t[5] * w + t[9] * E)),
            (t[14] = n[2] + E - (t[2] * p + t[6] * w + t[10] * E)),
            (t[15] = 1),
            t
          );
        }),
        (o.fromQuat = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = n + n,
            e = r + r,
            M = o + o,
            s = n * l,
            i = r * l,
            c = r * e,
            h = o * l,
            S = o * e,
            I = o * M,
            f = u * l,
            x = u * e,
            D = u * M;
          return (
            (t[0] = 1 - c - I),
            (t[1] = i + D),
            (t[2] = h - x),
            (t[3] = 0),
            (t[4] = i - D),
            (t[5] = 1 - s - I),
            (t[6] = S + f),
            (t[7] = 0),
            (t[8] = h + x),
            (t[9] = S - f),
            (t[10] = 1 - s - c),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        }),
        (o.frustum = function (t, a, n, r, o, u, l) {
          var e = 1 / (n - a),
            M = 1 / (o - r),
            s = 1 / (u - l);
          return (
            (t[0] = 2 * u * e),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 2 * u * M),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = (n + a) * e),
            (t[9] = (o + r) * M),
            (t[10] = (l + u) * s),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = l * u * 2 * s),
            (t[15] = 0),
            t
          );
        }),
        (o.perspective = function (t, a, n, r, o) {
          var u = 1 / Math.tan(a / 2),
            l = 1 / (r - o);
          return (
            (t[0] = u / n),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = u),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = (o + r) * l),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 2 * o * r * l),
            (t[15] = 0),
            t
          );
        }),
        (o.perspectiveFromFieldOfView = function (t, a, n, r) {
          var o = Math.tan((a.upDegrees * Math.PI) / 180),
            u = Math.tan((a.downDegrees * Math.PI) / 180),
            l = Math.tan((a.leftDegrees * Math.PI) / 180),
            e = Math.tan((a.rightDegrees * Math.PI) / 180),
            M = 2 / (l + e),
            s = 2 / (o + u);
          return (
            (t[0] = M),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = s),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = -((l - e) * M * 0.5)),
            (t[9] = (o - u) * s * 0.5),
            (t[10] = r / (n - r)),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = (r * n) / (n - r)),
            (t[15] = 0),
            t
          );
        }),
        (o.ortho = function (t, a, n, r, o, u, l) {
          var e = 1 / (a - n),
            M = 1 / (r - o),
            s = 1 / (u - l);
          return (
            (t[0] = -2 * e),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = -2 * M),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 2 * s),
            (t[11] = 0),
            (t[12] = (a + n) * e),
            (t[13] = (o + r) * M),
            (t[14] = (l + u) * s),
            (t[15] = 1),
            t
          );
        }),
        (o.lookAt = function (t, a, n, u) {
          var l,
            e,
            M,
            s,
            i,
            c,
            h,
            S,
            I,
            f,
            x = a[0],
            D = a[1],
            F = a[2],
            m = u[0],
            d = u[1],
            b = u[2],
            v = n[0],
            z = n[1],
            p = n[2];
          return Math.abs(x - v) < r.EPSILON &&
            Math.abs(D - z) < r.EPSILON &&
            Math.abs(F - p) < r.EPSILON
            ? o.identity(t)
            : ((h = x - v),
              (S = D - z),
              (I = F - p),
              (f = 1 / Math.sqrt(h * h + S * S + I * I)),
              (h *= f),
              (S *= f),
              (I *= f),
              (l = d * I - b * S),
              (e = b * h - m * I),
              (M = m * S - d * h),
              (f = Math.sqrt(l * l + e * e + M * M)),
              f
                ? ((f = 1 / f), (l *= f), (e *= f), (M *= f))
                : ((l = 0), (e = 0), (M = 0)),
              (s = S * M - I * e),
              (i = I * l - h * M),
              (c = h * e - S * l),
              (f = Math.sqrt(s * s + i * i + c * c)),
              f
                ? ((f = 1 / f), (s *= f), (i *= f), (c *= f))
                : ((s = 0), (i = 0), (c = 0)),
              (t[0] = l),
              (t[1] = s),
              (t[2] = h),
              (t[3] = 0),
              (t[4] = e),
              (t[5] = i),
              (t[6] = S),
              (t[7] = 0),
              (t[8] = M),
              (t[9] = c),
              (t[10] = I),
              (t[11] = 0),
              (t[12] = -(l * x + e * D + M * F)),
              (t[13] = -(s * x + i * D + c * F)),
              (t[14] = -(h * x + S * D + I * F)),
              (t[15] = 1),
              t);
        }),
        (o.str = function (t) {
          return (
            "mat4(" +
            t[0] +
            ", " +
            t[1] +
            ", " +
            t[2] +
            ", " +
            t[3] +
            ", " +
            t[4] +
            ", " +
            t[5] +
            ", " +
            t[6] +
            ", " +
            t[7] +
            ", " +
            t[8] +
            ", " +
            t[9] +
            ", " +
            t[10] +
            ", " +
            t[11] +
            ", " +
            t[12] +
            ", " +
            t[13] +
            ", " +
            t[14] +
            ", " +
            t[15] +
            ")"
          );
        }),
        (o.frob = function (t) {
          return Math.sqrt(
            Math.pow(t[0], 2) +
              Math.pow(t[1], 2) +
              Math.pow(t[2], 2) +
              Math.pow(t[3], 2) +
              Math.pow(t[4], 2) +
              Math.pow(t[5], 2) +
              Math.pow(t[6], 2) +
              Math.pow(t[7], 2) +
              Math.pow(t[8], 2) +
              Math.pow(t[9], 2) +
              Math.pow(t[10], 2) +
              Math.pow(t[11], 2) +
              Math.pow(t[12], 2) +
              Math.pow(t[13], 2) +
              Math.pow(t[14], 2) +
              Math.pow(t[15], 2),
          );
        }),
        (o.add = function (t, a, n) {
          return (
            (t[0] = a[0] + n[0]),
            (t[1] = a[1] + n[1]),
            (t[2] = a[2] + n[2]),
            (t[3] = a[3] + n[3]),
            (t[4] = a[4] + n[4]),
            (t[5] = a[5] + n[5]),
            (t[6] = a[6] + n[6]),
            (t[7] = a[7] + n[7]),
            (t[8] = a[8] + n[8]),
            (t[9] = a[9] + n[9]),
            (t[10] = a[10] + n[10]),
            (t[11] = a[11] + n[11]),
            (t[12] = a[12] + n[12]),
            (t[13] = a[13] + n[13]),
            (t[14] = a[14] + n[14]),
            (t[15] = a[15] + n[15]),
            t
          );
        }),
        (o.subtract = function (t, a, n) {
          return (
            (t[0] = a[0] - n[0]),
            (t[1] = a[1] - n[1]),
            (t[2] = a[2] - n[2]),
            (t[3] = a[3] - n[3]),
            (t[4] = a[4] - n[4]),
            (t[5] = a[5] - n[5]),
            (t[6] = a[6] - n[6]),
            (t[7] = a[7] - n[7]),
            (t[8] = a[8] - n[8]),
            (t[9] = a[9] - n[9]),
            (t[10] = a[10] - n[10]),
            (t[11] = a[11] - n[11]),
            (t[12] = a[12] - n[12]),
            (t[13] = a[13] - n[13]),
            (t[14] = a[14] - n[14]),
            (t[15] = a[15] - n[15]),
            t
          );
        }),
        (o.sub = o.subtract),
        (o.multiplyScalar = function (t, a, n) {
          return (
            (t[0] = a[0] * n),
            (t[1] = a[1] * n),
            (t[2] = a[2] * n),
            (t[3] = a[3] * n),
            (t[4] = a[4] * n),
            (t[5] = a[5] * n),
            (t[6] = a[6] * n),
            (t[7] = a[7] * n),
            (t[8] = a[8] * n),
            (t[9] = a[9] * n),
            (t[10] = a[10] * n),
            (t[11] = a[11] * n),
            (t[12] = a[12] * n),
            (t[13] = a[13] * n),
            (t[14] = a[14] * n),
            (t[15] = a[15] * n),
            t
          );
        }),
        (o.multiplyScalarAndAdd = function (t, a, n, r) {
          return (
            (t[0] = a[0] + n[0] * r),
            (t[1] = a[1] + n[1] * r),
            (t[2] = a[2] + n[2] * r),
            (t[3] = a[3] + n[3] * r),
            (t[4] = a[4] + n[4] * r),
            (t[5] = a[5] + n[5] * r),
            (t[6] = a[6] + n[6] * r),
            (t[7] = a[7] + n[7] * r),
            (t[8] = a[8] + n[8] * r),
            (t[9] = a[9] + n[9] * r),
            (t[10] = a[10] + n[10] * r),
            (t[11] = a[11] + n[11] * r),
            (t[12] = a[12] + n[12] * r),
            (t[13] = a[13] + n[13] * r),
            (t[14] = a[14] + n[14] * r),
            (t[15] = a[15] + n[15] * r),
            t
          );
        }),
        (o.exactEquals = function (t, a) {
          return (
            t[0] === a[0] &&
            t[1] === a[1] &&
            t[2] === a[2] &&
            t[3] === a[3] &&
            t[4] === a[4] &&
            t[5] === a[5] &&
            t[6] === a[6] &&
            t[7] === a[7] &&
            t[8] === a[8] &&
            t[9] === a[9] &&
            t[10] === a[10] &&
            t[11] === a[11] &&
            t[12] === a[12] &&
            t[13] === a[13] &&
            t[14] === a[14] &&
            t[15] === a[15]
          );
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = t[2],
            l = t[3],
            e = t[4],
            M = t[5],
            s = t[6],
            i = t[7],
            c = t[8],
            h = t[9],
            S = t[10],
            I = t[11],
            f = t[12],
            x = t[13],
            D = t[14],
            F = t[15],
            m = a[0],
            d = a[1],
            b = a[2],
            v = a[3],
            z = a[4],
            p = a[5],
            w = a[6],
            E = a[7],
            A = a[8],
            P = a[9],
            L = a[10],
            q = a[11],
            R = a[12],
            N = a[13],
            O = a[14],
            Y = a[15];
          return (
            Math.abs(n - m) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(m)) &&
            Math.abs(o - d) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(d)) &&
            Math.abs(u - b) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(b)) &&
            Math.abs(l - v) <=
              r.EPSILON * Math.max(1, Math.abs(l), Math.abs(v)) &&
            Math.abs(e - z) <=
              r.EPSILON * Math.max(1, Math.abs(e), Math.abs(z)) &&
            Math.abs(M - p) <=
              r.EPSILON * Math.max(1, Math.abs(M), Math.abs(p)) &&
            Math.abs(s - w) <=
              r.EPSILON * Math.max(1, Math.abs(s), Math.abs(w)) &&
            Math.abs(i - E) <=
              r.EPSILON * Math.max(1, Math.abs(i), Math.abs(E)) &&
            Math.abs(c - A) <=
              r.EPSILON * Math.max(1, Math.abs(c), Math.abs(A)) &&
            Math.abs(h - P) <=
              r.EPSILON * Math.max(1, Math.abs(h), Math.abs(P)) &&
            Math.abs(S - L) <=
              r.EPSILON * Math.max(1, Math.abs(S), Math.abs(L)) &&
            Math.abs(I - q) <=
              r.EPSILON * Math.max(1, Math.abs(I), Math.abs(q)) &&
            Math.abs(f - R) <=
              r.EPSILON * Math.max(1, Math.abs(f), Math.abs(R)) &&
            Math.abs(x - N) <=
              r.EPSILON * Math.max(1, Math.abs(x), Math.abs(N)) &&
            Math.abs(D - O) <=
              r.EPSILON * Math.max(1, Math.abs(D), Math.abs(O)) &&
            Math.abs(F - Y) <= r.EPSILON * Math.max(1, Math.abs(F), Math.abs(Y))
          );
        }),
        (t.exports = o);
    },
    function (t, a, n) {
      var r = n(1),
        o = n(4),
        u = n(7),
        l = n(8),
        e = {};
      (e.create = function () {
        var t = new r.ARRAY_TYPE(4);
        return (t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 1), t;
      }),
        (e.rotationTo = (function () {
          var t = u.create(),
            a = u.fromValues(1, 0, 0),
            n = u.fromValues(0, 1, 0);
          return function (r, o, l) {
            var M = u.dot(o, l);
            return -0.999999 > M
              ? (u.cross(t, a, o),
                u.length(t) < 1e-6 && u.cross(t, n, o),
                u.normalize(t, t),
                e.setAxisAngle(r, t, Math.PI),
                r)
              : M > 0.999999
                ? ((r[0] = 0), (r[1] = 0), (r[2] = 0), (r[3] = 1), r)
                : (u.cross(t, o, l),
                  (r[0] = t[0]),
                  (r[1] = t[1]),
                  (r[2] = t[2]),
                  (r[3] = 1 + M),
                  e.normalize(r, r));
          };
        })()),
        (e.setAxes = (function () {
          var t = o.create();
          return function (a, n, r, o) {
            return (
              (t[0] = r[0]),
              (t[3] = r[1]),
              (t[6] = r[2]),
              (t[1] = o[0]),
              (t[4] = o[1]),
              (t[7] = o[2]),
              (t[2] = -n[0]),
              (t[5] = -n[1]),
              (t[8] = -n[2]),
              e.normalize(a, e.fromMat3(a, t))
            );
          };
        })()),
        (e.clone = l.clone),
        (e.fromValues = l.fromValues),
        (e.copy = l.copy),
        (e.set = l.set),
        (e.identity = function (t) {
          return (t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 1), t;
        }),
        (e.setAxisAngle = function (t, a, n) {
          n = 0.5 * n;
          var r = Math.sin(n);
          return (
            (t[0] = r * a[0]),
            (t[1] = r * a[1]),
            (t[2] = r * a[2]),
            (t[3] = Math.cos(n)),
            t
          );
        }),
        (e.getAxisAngle = function (t, a) {
          var n = 2 * Math.acos(a[3]),
            r = Math.sin(n / 2);
          return (
            0 != r
              ? ((t[0] = a[0] / r), (t[1] = a[1] / r), (t[2] = a[2] / r))
              : ((t[0] = 1), (t[1] = 0), (t[2] = 0)),
            n
          );
        }),
        (e.add = l.add),
        (e.multiply = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = n[0],
            M = n[1],
            s = n[2],
            i = n[3];
          return (
            (t[0] = r * i + l * e + o * s - u * M),
            (t[1] = o * i + l * M + u * e - r * s),
            (t[2] = u * i + l * s + r * M - o * e),
            (t[3] = l * i - r * e - o * M - u * s),
            t
          );
        }),
        (e.mul = e.multiply),
        (e.scale = l.scale),
        (e.rotateX = function (t, a, n) {
          n *= 0.5;
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = Math.sin(n),
            M = Math.cos(n);
          return (
            (t[0] = r * M + l * e),
            (t[1] = o * M + u * e),
            (t[2] = u * M - o * e),
            (t[3] = l * M - r * e),
            t
          );
        }),
        (e.rotateY = function (t, a, n) {
          n *= 0.5;
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = Math.sin(n),
            M = Math.cos(n);
          return (
            (t[0] = r * M - u * e),
            (t[1] = o * M + l * e),
            (t[2] = u * M + r * e),
            (t[3] = l * M - o * e),
            t
          );
        }),
        (e.rotateZ = function (t, a, n) {
          n *= 0.5;
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3],
            e = Math.sin(n),
            M = Math.cos(n);
          return (
            (t[0] = r * M + o * e),
            (t[1] = o * M - r * e),
            (t[2] = u * M + l * e),
            (t[3] = l * M - u * e),
            t
          );
        }),
        (e.calculateW = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2];
          return (
            (t[0] = n),
            (t[1] = r),
            (t[2] = o),
            (t[3] = Math.sqrt(Math.abs(1 - n * n - r * r - o * o))),
            t
          );
        }),
        (e.dot = l.dot),
        (e.lerp = l.lerp),
        (e.slerp = function (t, a, n, r) {
          var o,
            u,
            l,
            e,
            M,
            s = a[0],
            i = a[1],
            c = a[2],
            h = a[3],
            S = n[0],
            I = n[1],
            f = n[2],
            x = n[3];
          return (
            (u = s * S + i * I + c * f + h * x),
            0 > u && ((u = -u), (S = -S), (I = -I), (f = -f), (x = -x)),
            1 - u > 1e-6
              ? ((o = Math.acos(u)),
                (l = Math.sin(o)),
                (e = Math.sin((1 - r) * o) / l),
                (M = Math.sin(r * o) / l))
              : ((e = 1 - r), (M = r)),
            (t[0] = e * s + M * S),
            (t[1] = e * i + M * I),
            (t[2] = e * c + M * f),
            (t[3] = e * h + M * x),
            t
          );
        }),
        (e.sqlerp = (function () {
          var t = e.create(),
            a = e.create();
          return function (n, r, o, u, l, M) {
            return (
              e.slerp(t, r, l, M),
              e.slerp(a, o, u, M),
              e.slerp(n, t, a, 2 * M * (1 - M)),
              n
            );
          };
        })()),
        (e.invert = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = n * n + r * r + o * o + u * u,
            e = l ? 1 / l : 0;
          return (
            (t[0] = -n * e), (t[1] = -r * e), (t[2] = -o * e), (t[3] = u * e), t
          );
        }),
        (e.conjugate = function (t, a) {
          return (
            (t[0] = -a[0]), (t[1] = -a[1]), (t[2] = -a[2]), (t[3] = a[3]), t
          );
        }),
        (e.length = l.length),
        (e.len = e.length),
        (e.squaredLength = l.squaredLength),
        (e.sqrLen = e.squaredLength),
        (e.normalize = l.normalize),
        (e.fromMat3 = function (t, a) {
          var n,
            r = a[0] + a[4] + a[8];
          if (r > 0)
            (n = Math.sqrt(r + 1)),
              (t[3] = 0.5 * n),
              (n = 0.5 / n),
              (t[0] = (a[5] - a[7]) * n),
              (t[1] = (a[6] - a[2]) * n),
              (t[2] = (a[1] - a[3]) * n);
          else {
            var o = 0;
            a[4] > a[0] && (o = 1), a[8] > a[3 * o + o] && (o = 2);
            var u = (o + 1) % 3,
              l = (o + 2) % 3;
            (n = Math.sqrt(a[3 * o + o] - a[3 * u + u] - a[3 * l + l] + 1)),
              (t[o] = 0.5 * n),
              (n = 0.5 / n),
              (t[3] = (a[3 * u + l] - a[3 * l + u]) * n),
              (t[u] = (a[3 * u + o] + a[3 * o + u]) * n),
              (t[l] = (a[3 * l + o] + a[3 * o + l]) * n);
          }
          return t;
        }),
        (e.str = function (t) {
          return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
        }),
        (e.exactEquals = l.exactEquals),
        (e.equals = l.equals),
        (t.exports = e);
    },
    function (t, a, n) {
      var r = n(1),
        o = {};
      (o.create = function () {
        var t = new r.ARRAY_TYPE(3);
        return (t[0] = 0), (t[1] = 0), (t[2] = 0), t;
      }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(3);
          return (a[0] = t[0]), (a[1] = t[1]), (a[2] = t[2]), a;
        }),
        (o.fromValues = function (t, a, n) {
          var o = new r.ARRAY_TYPE(3);
          return (o[0] = t), (o[1] = a), (o[2] = n), o;
        }),
        (o.copy = function (t, a) {
          return (t[0] = a[0]), (t[1] = a[1]), (t[2] = a[2]), t;
        }),
        (o.set = function (t, a, n, r) {
          return (t[0] = a), (t[1] = n), (t[2] = r), t;
        }),
        (o.add = function (t, a, n) {
          return (
            (t[0] = a[0] + n[0]), (t[1] = a[1] + n[1]), (t[2] = a[2] + n[2]), t
          );
        }),
        (o.subtract = function (t, a, n) {
          return (
            (t[0] = a[0] - n[0]), (t[1] = a[1] - n[1]), (t[2] = a[2] - n[2]), t
          );
        }),
        (o.sub = o.subtract),
        (o.multiply = function (t, a, n) {
          return (
            (t[0] = a[0] * n[0]), (t[1] = a[1] * n[1]), (t[2] = a[2] * n[2]), t
          );
        }),
        (o.mul = o.multiply),
        (o.divide = function (t, a, n) {
          return (
            (t[0] = a[0] / n[0]), (t[1] = a[1] / n[1]), (t[2] = a[2] / n[2]), t
          );
        }),
        (o.div = o.divide),
        (o.ceil = function (t, a) {
          return (
            (t[0] = Math.ceil(a[0])),
            (t[1] = Math.ceil(a[1])),
            (t[2] = Math.ceil(a[2])),
            t
          );
        }),
        (o.floor = function (t, a) {
          return (
            (t[0] = Math.floor(a[0])),
            (t[1] = Math.floor(a[1])),
            (t[2] = Math.floor(a[2])),
            t
          );
        }),
        (o.min = function (t, a, n) {
          return (
            (t[0] = Math.min(a[0], n[0])),
            (t[1] = Math.min(a[1], n[1])),
            (t[2] = Math.min(a[2], n[2])),
            t
          );
        }),
        (o.max = function (t, a, n) {
          return (
            (t[0] = Math.max(a[0], n[0])),
            (t[1] = Math.max(a[1], n[1])),
            (t[2] = Math.max(a[2], n[2])),
            t
          );
        }),
        (o.round = function (t, a) {
          return (
            (t[0] = Math.round(a[0])),
            (t[1] = Math.round(a[1])),
            (t[2] = Math.round(a[2])),
            t
          );
        }),
        (o.scale = function (t, a, n) {
          return (t[0] = a[0] * n), (t[1] = a[1] * n), (t[2] = a[2] * n), t;
        }),
        (o.scaleAndAdd = function (t, a, n, r) {
          return (
            (t[0] = a[0] + n[0] * r),
            (t[1] = a[1] + n[1] * r),
            (t[2] = a[2] + n[2] * r),
            t
          );
        }),
        (o.distance = function (t, a) {
          var n = a[0] - t[0],
            r = a[1] - t[1],
            o = a[2] - t[2];
          return Math.sqrt(n * n + r * r + o * o);
        }),
        (o.dist = o.distance),
        (o.squaredDistance = function (t, a) {
          var n = a[0] - t[0],
            r = a[1] - t[1],
            o = a[2] - t[2];
          return n * n + r * r + o * o;
        }),
        (o.sqrDist = o.squaredDistance),
        (o.length = function (t) {
          var a = t[0],
            n = t[1],
            r = t[2];
          return Math.sqrt(a * a + n * n + r * r);
        }),
        (o.len = o.length),
        (o.squaredLength = function (t) {
          var a = t[0],
            n = t[1],
            r = t[2];
          return a * a + n * n + r * r;
        }),
        (o.sqrLen = o.squaredLength),
        (o.negate = function (t, a) {
          return (t[0] = -a[0]), (t[1] = -a[1]), (t[2] = -a[2]), t;
        }),
        (o.inverse = function (t, a) {
          return (t[0] = 1 / a[0]), (t[1] = 1 / a[1]), (t[2] = 1 / a[2]), t;
        }),
        (o.normalize = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = n * n + r * r + o * o;
          return (
            u > 0 &&
              ((u = 1 / Math.sqrt(u)),
              (t[0] = a[0] * u),
              (t[1] = a[1] * u),
              (t[2] = a[2] * u)),
            t
          );
        }),
        (o.dot = function (t, a) {
          return t[0] * a[0] + t[1] * a[1] + t[2] * a[2];
        }),
        (o.cross = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = n[0],
            e = n[1],
            M = n[2];
          return (
            (t[0] = o * M - u * e),
            (t[1] = u * l - r * M),
            (t[2] = r * e - o * l),
            t
          );
        }),
        (o.lerp = function (t, a, n, r) {
          var o = a[0],
            u = a[1],
            l = a[2];
          return (
            (t[0] = o + r * (n[0] - o)),
            (t[1] = u + r * (n[1] - u)),
            (t[2] = l + r * (n[2] - l)),
            t
          );
        }),
        (o.hermite = function (t, a, n, r, o, u) {
          var l = u * u,
            e = l * (2 * u - 3) + 1,
            M = l * (u - 2) + u,
            s = l * (u - 1),
            i = l * (3 - 2 * u);
          return (
            (t[0] = a[0] * e + n[0] * M + r[0] * s + o[0] * i),
            (t[1] = a[1] * e + n[1] * M + r[1] * s + o[1] * i),
            (t[2] = a[2] * e + n[2] * M + r[2] * s + o[2] * i),
            t
          );
        }),
        (o.bezier = function (t, a, n, r, o, u) {
          var l = 1 - u,
            e = l * l,
            M = u * u,
            s = e * l,
            i = 3 * u * e,
            c = 3 * M * l,
            h = M * u;
          return (
            (t[0] = a[0] * s + n[0] * i + r[0] * c + o[0] * h),
            (t[1] = a[1] * s + n[1] * i + r[1] * c + o[1] * h),
            (t[2] = a[2] * s + n[2] * i + r[2] * c + o[2] * h),
            t
          );
        }),
        (o.random = function (t, a) {
          a = a || 1;
          var n = 2 * r.RANDOM() * Math.PI,
            o = 2 * r.RANDOM() - 1,
            u = Math.sqrt(1 - o * o) * a;
          return (
            (t[0] = Math.cos(n) * u),
            (t[1] = Math.sin(n) * u),
            (t[2] = o * a),
            t
          );
        }),
        (o.transformMat4 = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = n[3] * r + n[7] * o + n[11] * u + n[15];
          return (
            (l = l || 1),
            (t[0] = (n[0] * r + n[4] * o + n[8] * u + n[12]) / l),
            (t[1] = (n[1] * r + n[5] * o + n[9] * u + n[13]) / l),
            (t[2] = (n[2] * r + n[6] * o + n[10] * u + n[14]) / l),
            t
          );
        }),
        (o.transformMat3 = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2];
          return (
            (t[0] = r * n[0] + o * n[3] + u * n[6]),
            (t[1] = r * n[1] + o * n[4] + u * n[7]),
            (t[2] = r * n[2] + o * n[5] + u * n[8]),
            t
          );
        }),
        (o.transformQuat = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = n[0],
            e = n[1],
            M = n[2],
            s = n[3],
            i = s * r + e * u - M * o,
            c = s * o + M * r - l * u,
            h = s * u + l * o - e * r,
            S = -l * r - e * o - M * u;
          return (
            (t[0] = i * s + S * -l + c * -M - h * -e),
            (t[1] = c * s + S * -e + h * -l - i * -M),
            (t[2] = h * s + S * -M + i * -e - c * -l),
            t
          );
        }),
        (o.rotateX = function (t, a, n, r) {
          var o = [],
            u = [];
          return (
            (o[0] = a[0] - n[0]),
            (o[1] = a[1] - n[1]),
            (o[2] = a[2] - n[2]),
            (u[0] = o[0]),
            (u[1] = o[1] * Math.cos(r) - o[2] * Math.sin(r)),
            (u[2] = o[1] * Math.sin(r) + o[2] * Math.cos(r)),
            (t[0] = u[0] + n[0]),
            (t[1] = u[1] + n[1]),
            (t[2] = u[2] + n[2]),
            t
          );
        }),
        (o.rotateY = function (t, a, n, r) {
          var o = [],
            u = [];
          return (
            (o[0] = a[0] - n[0]),
            (o[1] = a[1] - n[1]),
            (o[2] = a[2] - n[2]),
            (u[0] = o[2] * Math.sin(r) + o[0] * Math.cos(r)),
            (u[1] = o[1]),
            (u[2] = o[2] * Math.cos(r) - o[0] * Math.sin(r)),
            (t[0] = u[0] + n[0]),
            (t[1] = u[1] + n[1]),
            (t[2] = u[2] + n[2]),
            t
          );
        }),
        (o.rotateZ = function (t, a, n, r) {
          var o = [],
            u = [];
          return (
            (o[0] = a[0] - n[0]),
            (o[1] = a[1] - n[1]),
            (o[2] = a[2] - n[2]),
            (u[0] = o[0] * Math.cos(r) - o[1] * Math.sin(r)),
            (u[1] = o[0] * Math.sin(r) + o[1] * Math.cos(r)),
            (u[2] = o[2]),
            (t[0] = u[0] + n[0]),
            (t[1] = u[1] + n[1]),
            (t[2] = u[2] + n[2]),
            t
          );
        }),
        (o.forEach = (function () {
          var t = o.create();
          return function (a, n, r, o, u, l) {
            var e, M;
            for (
              n || (n = 3),
                r || (r = 0),
                M = o ? Math.min(o * n + r, a.length) : a.length,
                e = r;
              M > e;
              e += n
            )
              (t[0] = a[e]),
                (t[1] = a[e + 1]),
                (t[2] = a[e + 2]),
                u(t, t, l),
                (a[e] = t[0]),
                (a[e + 1] = t[1]),
                (a[e + 2] = t[2]);
            return a;
          };
        })()),
        (o.angle = function (t, a) {
          var n = o.fromValues(t[0], t[1], t[2]),
            r = o.fromValues(a[0], a[1], a[2]);
          o.normalize(n, n), o.normalize(r, r);
          var u = o.dot(n, r);
          return u > 1 ? 0 : Math.acos(u);
        }),
        (o.str = function (t) {
          return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
        }),
        (o.exactEquals = function (t, a) {
          return t[0] === a[0] && t[1] === a[1] && t[2] === a[2];
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = t[2],
            l = a[0],
            e = a[1],
            M = a[2];
          return (
            Math.abs(n - l) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(l)) &&
            Math.abs(o - e) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(e)) &&
            Math.abs(u - M) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(M))
          );
        }),
        (t.exports = o);
    },
    function (t, a, n) {
      var r = n(1),
        o = {};
      (o.create = function () {
        var t = new r.ARRAY_TYPE(4);
        return (t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0), t;
      }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(4);
          return (a[0] = t[0]), (a[1] = t[1]), (a[2] = t[2]), (a[3] = t[3]), a;
        }),
        (o.fromValues = function (t, a, n, o) {
          var u = new r.ARRAY_TYPE(4);
          return (u[0] = t), (u[1] = a), (u[2] = n), (u[3] = o), u;
        }),
        (o.copy = function (t, a) {
          return (t[0] = a[0]), (t[1] = a[1]), (t[2] = a[2]), (t[3] = a[3]), t;
        }),
        (o.set = function (t, a, n, r, o) {
          return (t[0] = a), (t[1] = n), (t[2] = r), (t[3] = o), t;
        }),
        (o.add = function (t, a, n) {
          return (
            (t[0] = a[0] + n[0]),
            (t[1] = a[1] + n[1]),
            (t[2] = a[2] + n[2]),
            (t[3] = a[3] + n[3]),
            t
          );
        }),
        (o.subtract = function (t, a, n) {
          return (
            (t[0] = a[0] - n[0]),
            (t[1] = a[1] - n[1]),
            (t[2] = a[2] - n[2]),
            (t[3] = a[3] - n[3]),
            t
          );
        }),
        (o.sub = o.subtract),
        (o.multiply = function (t, a, n) {
          return (
            (t[0] = a[0] * n[0]),
            (t[1] = a[1] * n[1]),
            (t[2] = a[2] * n[2]),
            (t[3] = a[3] * n[3]),
            t
          );
        }),
        (o.mul = o.multiply),
        (o.divide = function (t, a, n) {
          return (
            (t[0] = a[0] / n[0]),
            (t[1] = a[1] / n[1]),
            (t[2] = a[2] / n[2]),
            (t[3] = a[3] / n[3]),
            t
          );
        }),
        (o.div = o.divide),
        (o.ceil = function (t, a) {
          return (
            (t[0] = Math.ceil(a[0])),
            (t[1] = Math.ceil(a[1])),
            (t[2] = Math.ceil(a[2])),
            (t[3] = Math.ceil(a[3])),
            t
          );
        }),
        (o.floor = function (t, a) {
          return (
            (t[0] = Math.floor(a[0])),
            (t[1] = Math.floor(a[1])),
            (t[2] = Math.floor(a[2])),
            (t[3] = Math.floor(a[3])),
            t
          );
        }),
        (o.min = function (t, a, n) {
          return (
            (t[0] = Math.min(a[0], n[0])),
            (t[1] = Math.min(a[1], n[1])),
            (t[2] = Math.min(a[2], n[2])),
            (t[3] = Math.min(a[3], n[3])),
            t
          );
        }),
        (o.max = function (t, a, n) {
          return (
            (t[0] = Math.max(a[0], n[0])),
            (t[1] = Math.max(a[1], n[1])),
            (t[2] = Math.max(a[2], n[2])),
            (t[3] = Math.max(a[3], n[3])),
            t
          );
        }),
        (o.round = function (t, a) {
          return (
            (t[0] = Math.round(a[0])),
            (t[1] = Math.round(a[1])),
            (t[2] = Math.round(a[2])),
            (t[3] = Math.round(a[3])),
            t
          );
        }),
        (o.scale = function (t, a, n) {
          return (
            (t[0] = a[0] * n),
            (t[1] = a[1] * n),
            (t[2] = a[2] * n),
            (t[3] = a[3] * n),
            t
          );
        }),
        (o.scaleAndAdd = function (t, a, n, r) {
          return (
            (t[0] = a[0] + n[0] * r),
            (t[1] = a[1] + n[1] * r),
            (t[2] = a[2] + n[2] * r),
            (t[3] = a[3] + n[3] * r),
            t
          );
        }),
        (o.distance = function (t, a) {
          var n = a[0] - t[0],
            r = a[1] - t[1],
            o = a[2] - t[2],
            u = a[3] - t[3];
          return Math.sqrt(n * n + r * r + o * o + u * u);
        }),
        (o.dist = o.distance),
        (o.squaredDistance = function (t, a) {
          var n = a[0] - t[0],
            r = a[1] - t[1],
            o = a[2] - t[2],
            u = a[3] - t[3];
          return n * n + r * r + o * o + u * u;
        }),
        (o.sqrDist = o.squaredDistance),
        (o.length = function (t) {
          var a = t[0],
            n = t[1],
            r = t[2],
            o = t[3];
          return Math.sqrt(a * a + n * n + r * r + o * o);
        }),
        (o.len = o.length),
        (o.squaredLength = function (t) {
          var a = t[0],
            n = t[1],
            r = t[2],
            o = t[3];
          return a * a + n * n + r * r + o * o;
        }),
        (o.sqrLen = o.squaredLength),
        (o.negate = function (t, a) {
          return (
            (t[0] = -a[0]), (t[1] = -a[1]), (t[2] = -a[2]), (t[3] = -a[3]), t
          );
        }),
        (o.inverse = function (t, a) {
          return (
            (t[0] = 1 / a[0]),
            (t[1] = 1 / a[1]),
            (t[2] = 1 / a[2]),
            (t[3] = 1 / a[3]),
            t
          );
        }),
        (o.normalize = function (t, a) {
          var n = a[0],
            r = a[1],
            o = a[2],
            u = a[3],
            l = n * n + r * r + o * o + u * u;
          return (
            l > 0 &&
              ((l = 1 / Math.sqrt(l)),
              (t[0] = n * l),
              (t[1] = r * l),
              (t[2] = o * l),
              (t[3] = u * l)),
            t
          );
        }),
        (o.dot = function (t, a) {
          return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3];
        }),
        (o.lerp = function (t, a, n, r) {
          var o = a[0],
            u = a[1],
            l = a[2],
            e = a[3];
          return (
            (t[0] = o + r * (n[0] - o)),
            (t[1] = u + r * (n[1] - u)),
            (t[2] = l + r * (n[2] - l)),
            (t[3] = e + r * (n[3] - e)),
            t
          );
        }),
        (o.random = function (t, a) {
          return (
            (a = a || 1),
            (t[0] = r.RANDOM()),
            (t[1] = r.RANDOM()),
            (t[2] = r.RANDOM()),
            (t[3] = r.RANDOM()),
            o.normalize(t, t),
            o.scale(t, t, a),
            t
          );
        }),
        (o.transformMat4 = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = a[3];
          return (
            (t[0] = n[0] * r + n[4] * o + n[8] * u + n[12] * l),
            (t[1] = n[1] * r + n[5] * o + n[9] * u + n[13] * l),
            (t[2] = n[2] * r + n[6] * o + n[10] * u + n[14] * l),
            (t[3] = n[3] * r + n[7] * o + n[11] * u + n[15] * l),
            t
          );
        }),
        (o.transformQuat = function (t, a, n) {
          var r = a[0],
            o = a[1],
            u = a[2],
            l = n[0],
            e = n[1],
            M = n[2],
            s = n[3],
            i = s * r + e * u - M * o,
            c = s * o + M * r - l * u,
            h = s * u + l * o - e * r,
            S = -l * r - e * o - M * u;
          return (
            (t[0] = i * s + S * -l + c * -M - h * -e),
            (t[1] = c * s + S * -e + h * -l - i * -M),
            (t[2] = h * s + S * -M + i * -e - c * -l),
            (t[3] = a[3]),
            t
          );
        }),
        (o.forEach = (function () {
          var t = o.create();
          return function (a, n, r, o, u, l) {
            var e, M;
            for (
              n || (n = 4),
                r || (r = 0),
                M = o ? Math.min(o * n + r, a.length) : a.length,
                e = r;
              M > e;
              e += n
            )
              (t[0] = a[e]),
                (t[1] = a[e + 1]),
                (t[2] = a[e + 2]),
                (t[3] = a[e + 3]),
                u(t, t, l),
                (a[e] = t[0]),
                (a[e + 1] = t[1]),
                (a[e + 2] = t[2]),
                (a[e + 3] = t[3]);
            return a;
          };
        })()),
        (o.str = function (t) {
          return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
        }),
        (o.exactEquals = function (t, a) {
          return (
            t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3]
          );
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = t[2],
            l = t[3],
            e = a[0],
            M = a[1],
            s = a[2],
            i = a[3];
          return (
            Math.abs(n - e) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(e)) &&
            Math.abs(o - M) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(M)) &&
            Math.abs(u - s) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(s)) &&
            Math.abs(l - i) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(i))
          );
        }),
        (t.exports = o);
    },
    function (t, a, n) {
      var r = n(1),
        o = {};
      (o.create = function () {
        var t = new r.ARRAY_TYPE(2);
        return (t[0] = 0), (t[1] = 0), t;
      }),
        (o.clone = function (t) {
          var a = new r.ARRAY_TYPE(2);
          return (a[0] = t[0]), (a[1] = t[1]), a;
        }),
        (o.fromValues = function (t, a) {
          var n = new r.ARRAY_TYPE(2);
          return (n[0] = t), (n[1] = a), n;
        }),
        (o.copy = function (t, a) {
          return (t[0] = a[0]), (t[1] = a[1]), t;
        }),
        (o.set = function (t, a, n) {
          return (t[0] = a), (t[1] = n), t;
        }),
        (o.add = function (t, a, n) {
          return (t[0] = a[0] + n[0]), (t[1] = a[1] + n[1]), t;
        }),
        (o.subtract = function (t, a, n) {
          return (t[0] = a[0] - n[0]), (t[1] = a[1] - n[1]), t;
        }),
        (o.sub = o.subtract),
        (o.multiply = function (t, a, n) {
          return (t[0] = a[0] * n[0]), (t[1] = a[1] * n[1]), t;
        }),
        (o.mul = o.multiply),
        (o.divide = function (t, a, n) {
          return (t[0] = a[0] / n[0]), (t[1] = a[1] / n[1]), t;
        }),
        (o.div = o.divide),
        (o.ceil = function (t, a) {
          return (t[0] = Math.ceil(a[0])), (t[1] = Math.ceil(a[1])), t;
        }),
        (o.floor = function (t, a) {
          return (t[0] = Math.floor(a[0])), (t[1] = Math.floor(a[1])), t;
        }),
        (o.min = function (t, a, n) {
          return (
            (t[0] = Math.min(a[0], n[0])), (t[1] = Math.min(a[1], n[1])), t
          );
        }),
        (o.max = function (t, a, n) {
          return (
            (t[0] = Math.max(a[0], n[0])), (t[1] = Math.max(a[1], n[1])), t
          );
        }),
        (o.round = function (t, a) {
          return (t[0] = Math.round(a[0])), (t[1] = Math.round(a[1])), t;
        }),
        (o.scale = function (t, a, n) {
          return (t[0] = a[0] * n), (t[1] = a[1] * n), t;
        }),
        (o.scaleAndAdd = function (t, a, n, r) {
          return (t[0] = a[0] + n[0] * r), (t[1] = a[1] + n[1] * r), t;
        }),
        (o.distance = function (t, a) {
          var n = a[0] - t[0],
            r = a[1] - t[1];
          return Math.sqrt(n * n + r * r);
        }),
        (o.dist = o.distance),
        (o.squaredDistance = function (t, a) {
          var n = a[0] - t[0],
            r = a[1] - t[1];
          return n * n + r * r;
        }),
        (o.sqrDist = o.squaredDistance),
        (o.length = function (t) {
          var a = t[0],
            n = t[1];
          return Math.sqrt(a * a + n * n);
        }),
        (o.len = o.length),
        (o.squaredLength = function (t) {
          var a = t[0],
            n = t[1];
          return a * a + n * n;
        }),
        (o.sqrLen = o.squaredLength),
        (o.negate = function (t, a) {
          return (t[0] = -a[0]), (t[1] = -a[1]), t;
        }),
        (o.inverse = function (t, a) {
          return (t[0] = 1 / a[0]), (t[1] = 1 / a[1]), t;
        }),
        (o.normalize = function (t, a) {
          var n = a[0],
            r = a[1],
            o = n * n + r * r;
          return (
            o > 0 &&
              ((o = 1 / Math.sqrt(o)), (t[0] = a[0] * o), (t[1] = a[1] * o)),
            t
          );
        }),
        (o.dot = function (t, a) {
          return t[0] * a[0] + t[1] * a[1];
        }),
        (o.cross = function (t, a, n) {
          var r = a[0] * n[1] - a[1] * n[0];
          return (t[0] = t[1] = 0), (t[2] = r), t;
        }),
        (o.lerp = function (t, a, n, r) {
          var o = a[0],
            u = a[1];
          return (t[0] = o + r * (n[0] - o)), (t[1] = u + r * (n[1] - u)), t;
        }),
        (o.random = function (t, a) {
          a = a || 1;
          var n = 2 * r.RANDOM() * Math.PI;
          return (t[0] = Math.cos(n) * a), (t[1] = Math.sin(n) * a), t;
        }),
        (o.transformMat2 = function (t, a, n) {
          var r = a[0],
            o = a[1];
          return (t[0] = n[0] * r + n[2] * o), (t[1] = n[1] * r + n[3] * o), t;
        }),
        (o.transformMat2d = function (t, a, n) {
          var r = a[0],
            o = a[1];
          return (
            (t[0] = n[0] * r + n[2] * o + n[4]),
            (t[1] = n[1] * r + n[3] * o + n[5]),
            t
          );
        }),
        (o.transformMat3 = function (t, a, n) {
          var r = a[0],
            o = a[1];
          return (
            (t[0] = n[0] * r + n[3] * o + n[6]),
            (t[1] = n[1] * r + n[4] * o + n[7]),
            t
          );
        }),
        (o.transformMat4 = function (t, a, n) {
          var r = a[0],
            o = a[1];
          return (
            (t[0] = n[0] * r + n[4] * o + n[12]),
            (t[1] = n[1] * r + n[5] * o + n[13]),
            t
          );
        }),
        (o.forEach = (function () {
          var t = o.create();
          return function (a, n, r, o, u, l) {
            var e, M;
            for (
              n || (n = 2),
                r || (r = 0),
                M = o ? Math.min(o * n + r, a.length) : a.length,
                e = r;
              M > e;
              e += n
            )
              (t[0] = a[e]),
                (t[1] = a[e + 1]),
                u(t, t, l),
                (a[e] = t[0]),
                (a[e + 1] = t[1]);
            return a;
          };
        })()),
        (o.str = function (t) {
          return "vec2(" + t[0] + ", " + t[1] + ")";
        }),
        (o.exactEquals = function (t, a) {
          return t[0] === a[0] && t[1] === a[1];
        }),
        (o.equals = function (t, a) {
          var n = t[0],
            o = t[1],
            u = a[0],
            l = a[1];
          return (
            Math.abs(n - u) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) &&
            Math.abs(o - l) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(l))
          );
        }),
        (t.exports = o);
    },
  ]);
});
