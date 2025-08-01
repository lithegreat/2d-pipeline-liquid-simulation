var Box2D = (function () {
  var _scriptDir = import.meta.url;

  return function (Box2D) {
    Box2D = Box2D || {};

    var a;
    a || (a = typeof Box2D !== "undefined" ? Box2D : {});
    var aa, ba;
    a.ready = new Promise(function (b, c) {
      aa = b;
      ba = c;
    });
    var ca = {},
      da;
    for (da in a) a.hasOwnProperty(da) && (ca[da] = a[da]);
    var ea = "object" === typeof window,
      ha = "function" === typeof importScripts,
      ia = "",
      ja,
      ka,
      la,
      ma,
      na;
    if (
      "object" === typeof process &&
      "object" === typeof process.versions &&
      "string" === typeof process.versions.node
    )
      (ia = ha ? require("path").dirname(ia) + "/" : __dirname + "/"),
        (ja = function (b, c) {
          ma || (ma = require("fs"));
          na || (na = require("path"));
          b = na.normalize(b);
          return ma.readFileSync(b, c ? null : "utf8");
        }),
        (la = function (b) {
          b = ja(b, !0);
          b.buffer || (b = new Uint8Array(b));
          b.buffer || oa("Assertion failed: undefined");
          return b;
        }),
        (ka = function (b, c, d) {
          ma || (ma = require("fs"));
          na || (na = require("path"));
          b = na.normalize(b);
          ma.readFile(b, function (e, q) {
            e ? d(e) : c(q.buffer);
          });
        }),
        1 < process.argv.length && process.argv[1].replace(/\\/g, "/"),
        process.argv.slice(2),
        process.on("uncaughtException", function (b) {
          throw b;
        }),
        process.on("unhandledRejection", oa),
        (a.inspect = function () {
          return "[Emscripten Module object]";
        });
    else if (ea || ha)
      ha
        ? (ia = self.location.href)
        : "undefined" !== typeof document &&
          document.currentScript &&
          (ia = document.currentScript.src),
        _scriptDir && (ia = _scriptDir),
        (ia =
          0 !== ia.indexOf("blob:")
            ? ia.substr(0, ia.lastIndexOf("/") + 1)
            : ""),
        (ja = function (b) {
          var c = new XMLHttpRequest();
          c.open("GET", b, !1);
          c.send(null);
          return c.responseText;
        }),
        ha &&
          (la = function (b) {
            var c = new XMLHttpRequest();
            c.open("GET", b, !1);
            c.responseType = "arraybuffer";
            c.send(null);
            return new Uint8Array(c.response);
          }),
        (ka = function (b, c, d) {
          var e = new XMLHttpRequest();
          e.open("GET", b, !0);
          e.responseType = "arraybuffer";
          e.onload = function () {
            200 == e.status || (0 == e.status && e.response)
              ? c(e.response)
              : d();
          };
          e.onerror = d;
          e.send(null);
        });
    var pa = a.print || console.log.bind(console),
      qa = a.printErr || console.warn.bind(console);
    for (da in ca) ca.hasOwnProperty(da) && (a[da] = ca[da]);
    ca = null;
    var ra;
    a.wasmBinary && (ra = a.wasmBinary);
    var noExitRuntime = a.noExitRuntime || !0;
    "object" !== typeof WebAssembly && oa("no native wasm support detected");
    var sa,
      ta = !1,
      ua =
        "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      va,
      wa,
      xa,
      ya,
      za;
    function Aa() {
      var b = sa.buffer;
      va = b;
      a.HEAP8 = new Int8Array(b);
      a.HEAP16 = new Int16Array(b);
      a.HEAP32 = xa = new Int32Array(b);
      a.HEAPU8 = wa = new Uint8Array(b);
      a.HEAPU16 = new Uint16Array(b);
      a.HEAPU32 = new Uint32Array(b);
      a.HEAPF32 = ya = new Float32Array(b);
      a.HEAPF64 = za = new Float64Array(b);
    }
    var Ba,
      Ca = [],
      Da = [],
      Ea = [],
      Fa = !1,
      Ga = 0,
      Ha = null,
      Ia = null;
    a.preloadedImages = {};
    a.preloadedAudios = {};
    function oa(b) {
      if (a.onAbort) a.onAbort(b);
      b += "";
      qa(b);
      ta = !0;
      b = new WebAssembly.RuntimeError(
        "abort(" + b + "). Build with -s ASSERTIONS=1 for more info.",
      );
      ba(b);
      throw b;
    }
    function Ja() {
      return Ka.startsWith("data:application/octet-stream;base64,");
    }
    var Ka;
    if (a.locateFile) {
      if (((Ka = "Box2D.wasm"), !Ja())) {
        var La = Ka;
        Ka = a.locateFile ? a.locateFile(La, ia) : ia + La;
      }
    } else Ka = new URL("Box2D.wasm", import.meta.url).toString();
    function Ma() {
      var b = Ka;
      try {
        if (b == Ka && ra) return new Uint8Array(ra);
        if (la) return la(b);
        throw "both async and sync fetching of the wasm failed";
      } catch (c) {
        oa(c);
      }
    }
    function Na() {
      if (!ra && (ea || ha)) {
        if ("function" === typeof fetch && !Ka.startsWith("file://"))
          return fetch(Ka, { credentials: "same-origin" })
            .then(function (b) {
              if (!b.ok)
                throw "failed to load wasm binary file at '" + Ka + "'";
              return b.arrayBuffer();
            })
            .catch(function () {
              return Ma();
            });
        if (ka)
          return new Promise(function (b, c) {
            ka(
              Ka,
              function (d) {
                b(new Uint8Array(d));
              },
              c,
            );
          });
      }
      return Promise.resolve().then(function () {
        return Ma();
      });
    }
    var Oa = {
      11238: function (b, c) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("BeginContact"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::BeginContact.";
        b.BeginContact(c);
      },
      11476: function (b, c) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("EndContact"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::EndContact.";
        b.EndContact(c);
      },
      11708: function (b, c, d) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("PreSolve"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::PreSolve.";
        b.PreSolve(c, d);
      },
      11937: function (b, c, d) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("PostSolve"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::PostSolve.";
        b.PostSolve(c, d);
      },
      12169: function (b, c, d) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("BeginContactParticleSystemParticleBodyContact"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::BeginContactParticleSystemParticleBodyContact.";
        b.BeginContactParticleSystemParticleBodyContact(c, d);
      },
      12509: function (b, c, d, e) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("EndContactFixtureParticleSystemIndex"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::EndContactFixtureParticleSystemIndex.";
        b.EndContactFixtureParticleSystemIndex(c, d, e);
      },
      12825: function (b, c, d) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("BeginContactParticleSystemParticleContact"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::BeginContactParticleSystemParticleContact.";
        b.BeginContactParticleSystemParticleContact(c, d);
      },
      13153: function (b, c, d, e) {
        b = a.getCache(a.JSContactListener)[b];
        if (!b.hasOwnProperty("EndContactParticleSystemIndexIndex"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListener::EndContactParticleSystemIndexIndex.";
        b.EndContactParticleSystemIndexIndex(c, d, e);
      },
      13463: function (b) {
        b = a.getCache(a.JSContactListenerWithoutSolveCallbacks)[b];
        if (!b.hasOwnProperty("JSContactListener"))
          throw "a JSImplementation must implement all functions, you forgot JSContactListenerWithoutSolveCallbacks::JSContactListener.";
        b.JSContactListener();
      },
      13756: function (b, c, d, e, q) {
        b = a.getCache(a.JSRayCastCallback)[b];
        if (!b.hasOwnProperty("ReportFixture"))
          throw "a JSImplementation must implement all functions, you forgot JSRayCastCallback::ReportFixture.";
        return b.ReportFixture(c, d, e, q);
      },
      14013: function (b, c, d, e, q, fa) {
        b = a.getCache(a.JSRayCastCallback)[b];
        if (!b.hasOwnProperty("ReportParticle"))
          throw "a JSImplementation must implement all functions, you forgot JSRayCastCallback::ReportParticle.";
        return b.ReportParticle(c, d, e, q, fa);
      },
      14276: function (b, c) {
        b = a.getCache(a.JSRayCastCallback)[b];
        if (!b.hasOwnProperty("ShouldQueryParticleSystem"))
          throw "a JSImplementation must implement all functions, you forgot JSRayCastCallback::ShouldQueryParticleSystem.";
        return b.ShouldQueryParticleSystem(c);
      },
      14560: function (b, c) {
        b = a.getCache(a.JSQueryCallback)[b];
        if (!b.hasOwnProperty("ReportFixture"))
          throw "a JSImplementation must implement all functions, you forgot JSQueryCallback::ReportFixture.";
        return b.ReportFixture(c);
      },
      14804: function (b, c, d) {
        b = a.getCache(a.JSQueryCallback)[b];
        if (!b.hasOwnProperty("ReportParticle"))
          throw "a JSImplementation must implement all functions, you forgot JSQueryCallback::ReportParticle.";
        return b.ReportParticle(c, d);
      },
      15054: function (b, c) {
        b = a.getCache(a.JSQueryCallback)[b];
        if (!b.hasOwnProperty("ShouldQueryParticleSystem"))
          throw "a JSImplementation must implement all functions, you forgot JSQueryCallback::ShouldQueryParticleSystem.";
        return b.ShouldQueryParticleSystem(c);
      },
      15334: function (b, c, d) {
        b = a.getCache(a.JSContactFilter)[b];
        if (!b.hasOwnProperty("ShouldCollide"))
          throw "a JSImplementation must implement all functions, you forgot JSContactFilter::ShouldCollide.";
        return b.ShouldCollide(c, d);
      },
      15581: function (b, c, d, e) {
        b = a.getCache(a.JSContactFilter)[b];
        if (!b.hasOwnProperty("ShouldCollideFixtureParticleSystemIndex"))
          throw "a JSImplementation must implement all functions, you forgot JSContactFilter::ShouldCollideFixtureParticleSystemIndex.";
        return b.ShouldCollideFixtureParticleSystemIndex(c, d, e);
      },
      15909: function (b, c, d, e) {
        b = a.getCache(a.JSContactFilter)[b];
        if (!b.hasOwnProperty("ShouldCollideParticleSystemIndexIndex"))
          throw "a JSImplementation must implement all functions, you forgot JSContactFilter::ShouldCollideParticleSystemIndexIndex.";
        return b.ShouldCollideParticleSystemIndexIndex(c, d, e);
      },
      16231: function (b, c) {
        b = a.getCache(a.JSDestructionListener)[b];
        if (!b.hasOwnProperty("SayGoodbyeJoint"))
          throw "a JSImplementation must implement all functions, you forgot JSDestructionListener::SayGoodbyeJoint.";
        b.SayGoodbyeJoint(c);
      },
      16486: function (b, c) {
        b = a.getCache(a.JSDestructionListener)[b];
        if (!b.hasOwnProperty("SayGoodbyeFixture"))
          throw "a JSImplementation must implement all functions, you forgot JSDestructionListener::SayGoodbyeFixture.";
        b.SayGoodbyeFixture(c);
      },
      16747: function (b, c) {
        b = a.getCache(a.JSDestructionListener)[b];
        if (!b.hasOwnProperty("SayGoodbyeParticleGroup"))
          throw "a JSImplementation must implement all functions, you forgot JSDestructionListener::SayGoodbyeParticleGroup.";
        b.SayGoodbyeParticleGroup(c);
      },
      17026: function (b, c, d) {
        b = a.getCache(a.JSDestructionListener)[b];
        if (!b.hasOwnProperty("SayGoodbyeParticleSystemIndex"))
          throw "a JSImplementation must implement all functions, you forgot JSDestructionListener::SayGoodbyeParticleSystemIndex.";
        b.SayGoodbyeParticleSystemIndex(c, d);
      },
      17326: function (b, c, d, e) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawPolygon"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawPolygon.";
        b.DrawPolygon(c, d, e);
      },
      17545: function (b, c, d, e) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawSolidPolygon"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawSolidPolygon.";
        b.DrawSolidPolygon(c, d, e);
      },
      17779: function (b, c, d, e) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawCircle"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawCircle.";
        b.DrawCircle(c, d, e);
      },
      17995: function (b, c, d, e, q) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawSolidCircle"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawSolidCircle.";
        b.DrawSolidCircle(c, d, e, q);
      },
      18229: function (b, c, d, e, q) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawParticles"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawParticles.";
        b.DrawParticles(c, d, e, q);
      },
      18457: function (b, c, d, e) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawSegment"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawSegment.";
        b.DrawSegment(c, d, e);
      },
      18676: function (b, c) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawTransform"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawTransform.";
        b.DrawTransform(c);
      },
      18895: function (b, c, d, e) {
        b = a.getCache(a.JSDraw)[b];
        if (!b.hasOwnProperty("DrawPoint"))
          throw "a JSImplementation must implement all functions, you forgot JSDraw::DrawPoint.";
        b.DrawPoint(c, d, e);
      },
      19108: function (b, c, d, e) {
        b = a.getCache(a.JSNodeCallback)[b];
        if (!b.hasOwnProperty("op_call"))
          throw "a JSImplementation must implement all functions, you forgot JSNodeCallback::op_call.";
        b.op_call(c, d, e);
      },
    };
    function Pa(b) {
      for (; 0 < b.length; ) {
        var c = b.shift();
        if ("function" == typeof c) c(a);
        else {
          var d = c.KI;
          "number" === typeof d
            ? void 0 === c.FC
              ? Ba.get(d)()
              : Ba.get(d)(c.FC)
            : d(void 0 === c.FC ? null : c.FC);
        }
      }
    }
    var Qa = [null, [], []],
      Ra = {},
      Ta = [];
    function Ua(b, c, d) {
      Ta.length = 0;
      var e;
      for (d >>= 2; (e = wa[c++]); )
        (e = 105 > e) && d & 1 && d++, Ta.push(e ? za[d++ >> 1] : xa[d]), ++d;
      return Oa[b].apply(null, Ta);
    }
    var Va = {
      d: function () {
        return 0;
      },
      j: function () {
        return 0;
      },
      k: function () {},
      g: function () {
        oa();
      },
      b: function (b, c) {
        throw "Array index " + b + " out of bounds: [0," + c + ")";
      },
      f: function (b, c, d) {
        return Ua(b, c, d);
      },
      a: Ua,
      m: function (b, c, d) {
        wa.copyWithin(b, c, c + d);
      },
      c: function (b) {
        var c = wa.length;
        b >>>= 0;
        if (2147483648 < b) return !1;
        for (var d = 1; 4 >= d; d *= 2) {
          var e = c * (1 + 0.2 / d);
          e = Math.min(e, b + 100663296);
          e = Math.max(b, e);
          0 < e % 65536 && (e += 65536 - (e % 65536));
          a: {
            try {
              sa.grow((Math.min(2147483648, e) - va.byteLength + 65535) >>> 16);
              Aa();
              var q = 1;
              break a;
            } catch (fa) {}
            q = void 0;
          }
          if (q) return !0;
        }
        return !1;
      },
      e: function () {
        return 0;
      },
      h: function (b, c, d, e) {
        b = Ra.LI(b);
        c = Ra.JI(b, c, d);
        xa[e >> 2] = c;
        return 0;
      },
      l: function () {},
      i: function (b, c, d, e) {
        for (var q = 0, fa = 0; fa < d; fa++) {
          for (
            var nb = xa[(c + 8 * fa) >> 2],
              Eb = xa[(c + (8 * fa + 4)) >> 2],
              Pb = 0;
            Pb < Eb;
            Pb++
          ) {
            var Ab = wa[nb + Pb],
              Qb = Qa[b];
            if (0 === Ab || 10 === Ab) {
              Ab = 1 === b ? pa : qa;
              var ab = Qb;
              for (
                var gb = 0, ob = gb + void 0, vb = gb;
                ab[vb] && !(vb >= ob);

              )
                ++vb;
              if (16 < vb - gb && ab.subarray && ua)
                ab = ua.decode(ab.subarray(gb, vb));
              else {
                for (ob = ""; gb < vb; ) {
                  var Sa = ab[gb++];
                  if (Sa & 128) {
                    var Rb = ab[gb++] & 63;
                    if (192 == (Sa & 224))
                      ob += String.fromCharCode(((Sa & 31) << 6) | Rb);
                    else {
                      var kc = ab[gb++] & 63;
                      Sa =
                        224 == (Sa & 240)
                          ? ((Sa & 15) << 12) | (Rb << 6) | kc
                          : ((Sa & 7) << 18) |
                            (Rb << 12) |
                            (kc << 6) |
                            (ab[gb++] & 63);
                      65536 > Sa
                        ? (ob += String.fromCharCode(Sa))
                        : ((Sa -= 65536),
                          (ob += String.fromCharCode(
                            55296 | (Sa >> 10),
                            56320 | (Sa & 1023),
                          )));
                    }
                  } else ob += String.fromCharCode(Sa);
                }
                ab = ob;
              }
              Ab(ab);
              Qb.length = 0;
            } else Qb.push(Ab);
          }
          q += Eb;
        }
        xa[e >> 2] = q;
        return 0;
      },
    };
    (function () {
      function b(q) {
        a.asm = q.exports;
        sa = a.asm.n;
        Aa();
        Ba = a.asm.BB;
        Da.unshift(a.asm.o);
        Ga--;
        a.monitorRunDependencies && a.monitorRunDependencies(Ga);
        0 == Ga &&
          (null !== Ha && (clearInterval(Ha), (Ha = null)),
          Ia && ((q = Ia), (Ia = null), q()));
      }
      function c(q) {
        b(q.instance);
      }
      function d(q) {
        return Na()
          .then(function (fa) {
            return WebAssembly.instantiate(fa, e);
          })
          .then(q, function (fa) {
            qa("failed to asynchronously prepare wasm: " + fa);
            oa(fa);
          });
      }
      var e = { a: Va };
      Ga++;
      a.monitorRunDependencies && a.monitorRunDependencies(Ga);
      if (a.instantiateWasm)
        try {
          return a.instantiateWasm(e, b);
        } catch (q) {
          return (
            qa("Module.instantiateWasm callback failed with error: " + q), !1
          );
        }
      (function () {
        return ra ||
          "function" !== typeof WebAssembly.instantiateStreaming ||
          Ja() ||
          Ka.startsWith("file://") ||
          "function" !== typeof fetch
          ? d(c)
          : fetch(Ka, { credentials: "same-origin" }).then(function (q) {
              return WebAssembly.instantiateStreaming(q, e).then(
                c,
                function (fa) {
                  qa("wasm streaming compile failed: " + fa);
                  qa("falling back to ArrayBuffer instantiation");
                  return d(c);
                },
              );
            });
      })().catch(ba);
      return {};
    })();
    a.___wasm_call_ctors = function () {
      return (a.___wasm_call_ctors = a.asm.o).apply(null, arguments);
    };
    var Wa = (a._emscripten_bind_b2ContactListenerWrapper___destroy___0 =
        function () {
          return (Wa =
            a._emscripten_bind_b2ContactListenerWrapper___destroy___0 =
              a.asm.p).apply(null, arguments);
        }),
      Xa = (a._emscripten_bind_b2Shape_GetType_0 = function () {
        return (Xa = a._emscripten_bind_b2Shape_GetType_0 = a.asm.q).apply(
          null,
          arguments,
        );
      }),
      Ya = (a._emscripten_bind_b2Shape_GetChildCount_0 = function () {
        return (Ya = a._emscripten_bind_b2Shape_GetChildCount_0 =
          a.asm.r).apply(null, arguments);
      }),
      Za = (a._emscripten_bind_b2Shape_TestPoint_2 = function () {
        return (Za = a._emscripten_bind_b2Shape_TestPoint_2 = a.asm.s).apply(
          null,
          arguments,
        );
      }),
      $a = (a._emscripten_bind_b2Shape_RayCast_4 = function () {
        return ($a = a._emscripten_bind_b2Shape_RayCast_4 = a.asm.t).apply(
          null,
          arguments,
        );
      }),
      bb = (a._emscripten_bind_b2Shape_ComputeAABB_3 = function () {
        return (bb = a._emscripten_bind_b2Shape_ComputeAABB_3 = a.asm.u).apply(
          null,
          arguments,
        );
      }),
      cb = (a._emscripten_bind_b2Shape_ComputeMass_2 = function () {
        return (cb = a._emscripten_bind_b2Shape_ComputeMass_2 = a.asm.v).apply(
          null,
          arguments,
        );
      }),
      db = (a._emscripten_bind_b2Shape_get_m_type_0 = function () {
        return (db = a._emscripten_bind_b2Shape_get_m_type_0 = a.asm.w).apply(
          null,
          arguments,
        );
      }),
      eb = (a._emscripten_bind_b2Shape_set_m_type_1 = function () {
        return (eb = a._emscripten_bind_b2Shape_set_m_type_1 = a.asm.x).apply(
          null,
          arguments,
        );
      }),
      fb = (a._emscripten_bind_b2Shape_get_m_radius_0 = function () {
        return (fb = a._emscripten_bind_b2Shape_get_m_radius_0 = a.asm.y).apply(
          null,
          arguments,
        );
      }),
      hb = (a._emscripten_bind_b2Shape_set_m_radius_1 = function () {
        return (hb = a._emscripten_bind_b2Shape_set_m_radius_1 = a.asm.z).apply(
          null,
          arguments,
        );
      }),
      ib = (a._emscripten_bind_b2Shape___destroy___0 = function () {
        return (ib = a._emscripten_bind_b2Shape___destroy___0 = a.asm.A).apply(
          null,
          arguments,
        );
      }),
      jb = (a._emscripten_bind_b2RayCastCallback___destroy___0 = function () {
        return (jb = a._emscripten_bind_b2RayCastCallback___destroy___0 =
          a.asm.B).apply(null, arguments);
      }),
      kb = (a._emscripten_bind_b2QueryCallback___destroy___0 = function () {
        return (kb = a._emscripten_bind_b2QueryCallback___destroy___0 =
          a.asm.C).apply(null, arguments);
      }),
      lb = (a._emscripten_bind_b2JointDef_b2JointDef_0 = function () {
        return (lb = a._emscripten_bind_b2JointDef_b2JointDef_0 =
          a.asm.D).apply(null, arguments);
      }),
      mb = (a._emscripten_bind_b2JointDef_get_type_0 = function () {
        return (mb = a._emscripten_bind_b2JointDef_get_type_0 = a.asm.E).apply(
          null,
          arguments,
        );
      }),
      pb = (a._emscripten_bind_b2JointDef_set_type_1 = function () {
        return (pb = a._emscripten_bind_b2JointDef_set_type_1 = a.asm.F).apply(
          null,
          arguments,
        );
      }),
      qb = (a._emscripten_bind_b2JointDef_get_userData_0 = function () {
        return (qb = a._emscripten_bind_b2JointDef_get_userData_0 =
          a.asm.G).apply(null, arguments);
      }),
      rb = (a._emscripten_bind_b2JointDef_set_userData_1 = function () {
        return (rb = a._emscripten_bind_b2JointDef_set_userData_1 =
          a.asm.H).apply(null, arguments);
      }),
      sb = (a._emscripten_bind_b2JointDef_get_bodyA_0 = function () {
        return (sb = a._emscripten_bind_b2JointDef_get_bodyA_0 = a.asm.I).apply(
          null,
          arguments,
        );
      }),
      tb = (a._emscripten_bind_b2JointDef_set_bodyA_1 = function () {
        return (tb = a._emscripten_bind_b2JointDef_set_bodyA_1 = a.asm.J).apply(
          null,
          arguments,
        );
      }),
      ub = (a._emscripten_bind_b2JointDef_get_bodyB_0 = function () {
        return (ub = a._emscripten_bind_b2JointDef_get_bodyB_0 = a.asm.K).apply(
          null,
          arguments,
        );
      }),
      wb = (a._emscripten_bind_b2JointDef_set_bodyB_1 = function () {
        return (wb = a._emscripten_bind_b2JointDef_set_bodyB_1 = a.asm.L).apply(
          null,
          arguments,
        );
      }),
      xb = (a._emscripten_bind_b2JointDef_get_collideConnected_0 = function () {
        return (xb = a._emscripten_bind_b2JointDef_get_collideConnected_0 =
          a.asm.M).apply(null, arguments);
      }),
      yb = (a._emscripten_bind_b2JointDef_set_collideConnected_1 = function () {
        return (yb = a._emscripten_bind_b2JointDef_set_collideConnected_1 =
          a.asm.N).apply(null, arguments);
      }),
      zb = (a._emscripten_bind_b2JointDef___destroy___0 = function () {
        return (zb = a._emscripten_bind_b2JointDef___destroy___0 =
          a.asm.O).apply(null, arguments);
      }),
      Bb = (a._emscripten_bind_b2Joint_GetType_0 = function () {
        return (Bb = a._emscripten_bind_b2Joint_GetType_0 = a.asm.P).apply(
          null,
          arguments,
        );
      }),
      Cb = (a._emscripten_bind_b2Joint_GetBodyA_0 = function () {
        return (Cb = a._emscripten_bind_b2Joint_GetBodyA_0 = a.asm.Q).apply(
          null,
          arguments,
        );
      }),
      Db = (a._emscripten_bind_b2Joint_GetBodyB_0 = function () {
        return (Db = a._emscripten_bind_b2Joint_GetBodyB_0 = a.asm.R).apply(
          null,
          arguments,
        );
      }),
      Fb = (a._emscripten_bind_b2Joint_GetAnchorA_0 = function () {
        return (Fb = a._emscripten_bind_b2Joint_GetAnchorA_0 = a.asm.S).apply(
          null,
          arguments,
        );
      }),
      Gb = (a._emscripten_bind_b2Joint_GetAnchorB_0 = function () {
        return (Gb = a._emscripten_bind_b2Joint_GetAnchorB_0 = a.asm.T).apply(
          null,
          arguments,
        );
      }),
      Hb = (a._emscripten_bind_b2Joint_GetReactionForce_1 = function () {
        return (Hb = a._emscripten_bind_b2Joint_GetReactionForce_1 =
          a.asm.U).apply(null, arguments);
      }),
      Ib = (a._emscripten_bind_b2Joint_GetReactionTorque_1 = function () {
        return (Ib = a._emscripten_bind_b2Joint_GetReactionTorque_1 =
          a.asm.V).apply(null, arguments);
      }),
      Jb = (a._emscripten_bind_b2Joint_GetNext_0 = function () {
        return (Jb = a._emscripten_bind_b2Joint_GetNext_0 = a.asm.W).apply(
          null,
          arguments,
        );
      }),
      Kb = (a._emscripten_bind_b2Joint_GetUserData_0 = function () {
        return (Kb = a._emscripten_bind_b2Joint_GetUserData_0 = a.asm.X).apply(
          null,
          arguments,
        );
      }),
      Lb = (a._emscripten_bind_b2Joint_GetCollideConnected_0 = function () {
        return (Lb = a._emscripten_bind_b2Joint_GetCollideConnected_0 =
          a.asm.Y).apply(null, arguments);
      }),
      Mb = (a._emscripten_bind_b2Joint_Dump_0 = function () {
        return (Mb = a._emscripten_bind_b2Joint_Dump_0 = a.asm.Z).apply(
          null,
          arguments,
        );
      }),
      Nb = (a._emscripten_bind_b2ContactFilterWrapper___destroy___0 =
        function () {
          return (Nb = a._emscripten_bind_b2ContactFilterWrapper___destroy___0 =
            a.asm._).apply(null, arguments);
        }),
      Ob = (a._emscripten_bind_b2DestructionListenerWrapper___destroy___0 =
        function () {
          return (Ob =
            a._emscripten_bind_b2DestructionListenerWrapper___destroy___0 =
              a.asm.$).apply(null, arguments);
        }),
      Sb = (a._emscripten_bind_b2Draw_SetFlags_1 = function () {
        return (Sb = a._emscripten_bind_b2Draw_SetFlags_1 = a.asm.aa).apply(
          null,
          arguments,
        );
      }),
      Tb = (a._emscripten_bind_b2Draw_GetFlags_0 = function () {
        return (Tb = a._emscripten_bind_b2Draw_GetFlags_0 = a.asm.ba).apply(
          null,
          arguments,
        );
      }),
      Ub = (a._emscripten_bind_b2Draw_AppendFlags_1 = function () {
        return (Ub = a._emscripten_bind_b2Draw_AppendFlags_1 = a.asm.ca).apply(
          null,
          arguments,
        );
      }),
      Vb = (a._emscripten_bind_b2Draw_ClearFlags_1 = function () {
        return (Vb = a._emscripten_bind_b2Draw_ClearFlags_1 = a.asm.da).apply(
          null,
          arguments,
        );
      }),
      Wb = (a._emscripten_bind_b2Draw___destroy___0 = function () {
        return (Wb = a._emscripten_bind_b2Draw___destroy___0 = a.asm.ea).apply(
          null,
          arguments,
        );
      }),
      Xb = (a._emscripten_bind_VoidPtr___destroy___0 = function () {
        return (Xb = a._emscripten_bind_VoidPtr___destroy___0 = a.asm.fa).apply(
          null,
          arguments,
        );
      }),
      Yb = (a._emscripten_bind_b2Contact_GetManifold_0 = function () {
        return (Yb = a._emscripten_bind_b2Contact_GetManifold_0 =
          a.asm.ga).apply(null, arguments);
      }),
      Zb = (a._emscripten_bind_b2Contact_GetWorldManifold_1 = function () {
        return (Zb = a._emscripten_bind_b2Contact_GetWorldManifold_1 =
          a.asm.ha).apply(null, arguments);
      }),
      $b = (a._emscripten_bind_b2Contact_IsTouching_0 = function () {
        return ($b = a._emscripten_bind_b2Contact_IsTouching_0 =
          a.asm.ia).apply(null, arguments);
      }),
      ac = (a._emscripten_bind_b2Contact_SetEnabled_1 = function () {
        return (ac = a._emscripten_bind_b2Contact_SetEnabled_1 =
          a.asm.ja).apply(null, arguments);
      }),
      bc = (a._emscripten_bind_b2Contact_IsEnabled_0 = function () {
        return (bc = a._emscripten_bind_b2Contact_IsEnabled_0 = a.asm.ka).apply(
          null,
          arguments,
        );
      }),
      cc = (a._emscripten_bind_b2Contact_GetNext_0 = function () {
        return (cc = a._emscripten_bind_b2Contact_GetNext_0 = a.asm.la).apply(
          null,
          arguments,
        );
      }),
      dc = (a._emscripten_bind_b2Contact_GetFixtureA_0 = function () {
        return (dc = a._emscripten_bind_b2Contact_GetFixtureA_0 =
          a.asm.ma).apply(null, arguments);
      }),
      ec = (a._emscripten_bind_b2Contact_GetChildIndexA_0 = function () {
        return (ec = a._emscripten_bind_b2Contact_GetChildIndexA_0 =
          a.asm.na).apply(null, arguments);
      }),
      fc = (a._emscripten_bind_b2Contact_GetFixtureB_0 = function () {
        return (fc = a._emscripten_bind_b2Contact_GetFixtureB_0 =
          a.asm.oa).apply(null, arguments);
      }),
      gc = (a._emscripten_bind_b2Contact_GetChildIndexB_0 = function () {
        return (gc = a._emscripten_bind_b2Contact_GetChildIndexB_0 =
          a.asm.pa).apply(null, arguments);
      }),
      hc = (a._emscripten_bind_b2Contact_SetFriction_1 = function () {
        return (hc = a._emscripten_bind_b2Contact_SetFriction_1 =
          a.asm.qa).apply(null, arguments);
      }),
      ic = (a._emscripten_bind_b2Contact_GetFriction_0 = function () {
        return (ic = a._emscripten_bind_b2Contact_GetFriction_0 =
          a.asm.ra).apply(null, arguments);
      }),
      jc = (a._emscripten_bind_b2Contact_ResetFriction_0 = function () {
        return (jc = a._emscripten_bind_b2Contact_ResetFriction_0 =
          a.asm.sa).apply(null, arguments);
      }),
      lc = (a._emscripten_bind_b2Contact_SetRestitution_1 = function () {
        return (lc = a._emscripten_bind_b2Contact_SetRestitution_1 =
          a.asm.ta).apply(null, arguments);
      }),
      mc = (a._emscripten_bind_b2Contact_GetRestitution_0 = function () {
        return (mc = a._emscripten_bind_b2Contact_GetRestitution_0 =
          a.asm.ua).apply(null, arguments);
      }),
      nc = (a._emscripten_bind_b2Contact_ResetRestitution_0 = function () {
        return (nc = a._emscripten_bind_b2Contact_ResetRestitution_0 =
          a.asm.va).apply(null, arguments);
      }),
      oc = (a._emscripten_bind_b2Contact_SetRestitutionThreshold_1 =
        function () {
          return (oc = a._emscripten_bind_b2Contact_SetRestitutionThreshold_1 =
            a.asm.wa).apply(null, arguments);
        }),
      pc = (a._emscripten_bind_b2Contact_GetRestitutionThreshold_0 =
        function () {
          return (pc = a._emscripten_bind_b2Contact_GetRestitutionThreshold_0 =
            a.asm.xa).apply(null, arguments);
        }),
      qc = (a._emscripten_bind_b2Contact_ResetRestitutionThreshold_0 =
        function () {
          return (qc =
            a._emscripten_bind_b2Contact_ResetRestitutionThreshold_0 =
              a.asm.ya).apply(null, arguments);
        }),
      rc = (a._emscripten_bind_b2Contact_SetTangentSpeed_1 = function () {
        return (rc = a._emscripten_bind_b2Contact_SetTangentSpeed_1 =
          a.asm.za).apply(null, arguments);
      }),
      sc = (a._emscripten_bind_b2Contact_GetTangentSpeed_0 = function () {
        return (sc = a._emscripten_bind_b2Contact_GetTangentSpeed_0 =
          a.asm.Aa).apply(null, arguments);
      }),
      tc = (a._emscripten_bind_b2ContactListener___destroy___0 = function () {
        return (tc = a._emscripten_bind_b2ContactListener___destroy___0 =
          a.asm.Ba).apply(null, arguments);
      }),
      uc = (a._emscripten_bind_JSContactListener_JSContactListener_0 =
        function () {
          return (uc =
            a._emscripten_bind_JSContactListener_JSContactListener_0 =
              a.asm.Ca).apply(null, arguments);
        }),
      vc = (a._emscripten_bind_JSContactListener_BeginContact_1 = function () {
        return (vc = a._emscripten_bind_JSContactListener_BeginContact_1 =
          a.asm.Da).apply(null, arguments);
      }),
      wc = (a._emscripten_bind_JSContactListener_EndContact_1 = function () {
        return (wc = a._emscripten_bind_JSContactListener_EndContact_1 =
          a.asm.Ea).apply(null, arguments);
      }),
      xc =
        (a._emscripten_bind_JSContactListener_BeginContactParticleSystemParticleBodyContact_2 =
          function () {
            return (xc =
              a._emscripten_bind_JSContactListener_BeginContactParticleSystemParticleBodyContact_2 =
                a.asm.Fa).apply(null, arguments);
          }),
      yc =
        (a._emscripten_bind_JSContactListener_EndContactFixtureParticleSystemIndex_3 =
          function () {
            return (yc =
              a._emscripten_bind_JSContactListener_EndContactFixtureParticleSystemIndex_3 =
                a.asm.Ga).apply(null, arguments);
          }),
      zc =
        (a._emscripten_bind_JSContactListener_BeginContactParticleSystemParticleContact_2 =
          function () {
            return (zc =
              a._emscripten_bind_JSContactListener_BeginContactParticleSystemParticleContact_2 =
                a.asm.Ha).apply(null, arguments);
          }),
      Ac =
        (a._emscripten_bind_JSContactListener_EndContactParticleSystemIndexIndex_3 =
          function () {
            return (Ac =
              a._emscripten_bind_JSContactListener_EndContactParticleSystemIndexIndex_3 =
                a.asm.Ia).apply(null, arguments);
          }),
      Bc = (a._emscripten_bind_JSContactListener_PreSolve_2 = function () {
        return (Bc = a._emscripten_bind_JSContactListener_PreSolve_2 =
          a.asm.Ja).apply(null, arguments);
      }),
      Cc = (a._emscripten_bind_JSContactListener_PostSolve_2 = function () {
        return (Cc = a._emscripten_bind_JSContactListener_PostSolve_2 =
          a.asm.Ka).apply(null, arguments);
      }),
      Dc = (a._emscripten_bind_JSContactListener___destroy___0 = function () {
        return (Dc = a._emscripten_bind_JSContactListener___destroy___0 =
          a.asm.La).apply(null, arguments);
      }),
      Ec =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_JSContactListener_0 =
          function () {
            return (Ec =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_JSContactListener_0 =
                a.asm.Ma).apply(null, arguments);
          }),
      Fc =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_BeginContact_1 =
          function () {
            return (Fc =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_BeginContact_1 =
                a.asm.Na).apply(null, arguments);
          }),
      Gc =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_EndContact_1 =
          function () {
            return (Gc =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_EndContact_1 =
                a.asm.Oa).apply(null, arguments);
          }),
      Hc =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_BeginContactParticleSystemParticleBodyContact_2 =
          function () {
            return (Hc =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_BeginContactParticleSystemParticleBodyContact_2 =
                a.asm.Pa).apply(null, arguments);
          }),
      Ic =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_EndContactFixtureParticleSystemIndex_3 =
          function () {
            return (Ic =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_EndContactFixtureParticleSystemIndex_3 =
                a.asm.Qa).apply(null, arguments);
          }),
      Jc =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_BeginContactParticleSystemParticleContact_2 =
          function () {
            return (Jc =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_BeginContactParticleSystemParticleContact_2 =
                a.asm.Ra).apply(null, arguments);
          }),
      Kc =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_EndContactParticleSystemIndexIndex_3 =
          function () {
            return (Kc =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks_EndContactParticleSystemIndexIndex_3 =
                a.asm.Sa).apply(null, arguments);
          }),
      Lc =
        (a._emscripten_bind_JSContactListenerWithoutSolveCallbacks___destroy___0 =
          function () {
            return (Lc =
              a._emscripten_bind_JSContactListenerWithoutSolveCallbacks___destroy___0 =
                a.asm.Ta).apply(null, arguments);
          }),
      Mc = (a._emscripten_bind_b2World_b2World_1 = function () {
        return (Mc = a._emscripten_bind_b2World_b2World_1 = a.asm.Ua).apply(
          null,
          arguments,
        );
      }),
      Nc = (a._emscripten_bind_b2World_SetDestructionListener_1 = function () {
        return (Nc = a._emscripten_bind_b2World_SetDestructionListener_1 =
          a.asm.Va).apply(null, arguments);
      }),
      Oc = (a._emscripten_bind_b2World_SetContactFilter_1 = function () {
        return (Oc = a._emscripten_bind_b2World_SetContactFilter_1 =
          a.asm.Wa).apply(null, arguments);
      }),
      Pc = (a._emscripten_bind_b2World_SetContactListener_1 = function () {
        return (Pc = a._emscripten_bind_b2World_SetContactListener_1 =
          a.asm.Xa).apply(null, arguments);
      }),
      Qc = (a._emscripten_bind_b2World_SetDebugDraw_1 = function () {
        return (Qc = a._emscripten_bind_b2World_SetDebugDraw_1 =
          a.asm.Ya).apply(null, arguments);
      }),
      Rc = (a._emscripten_bind_b2World_CreateBody_1 = function () {
        return (Rc = a._emscripten_bind_b2World_CreateBody_1 = a.asm.Za).apply(
          null,
          arguments,
        );
      }),
      Sc = (a._emscripten_bind_b2World_DestroyBody_1 = function () {
        return (Sc = a._emscripten_bind_b2World_DestroyBody_1 = a.asm._a).apply(
          null,
          arguments,
        );
      }),
      Tc = (a._emscripten_bind_b2World_CreateJoint_1 = function () {
        return (Tc = a._emscripten_bind_b2World_CreateJoint_1 = a.asm.$a).apply(
          null,
          arguments,
        );
      }),
      Uc = (a._emscripten_bind_b2World_DestroyJoint_1 = function () {
        return (Uc = a._emscripten_bind_b2World_DestroyJoint_1 =
          a.asm.ab).apply(null, arguments);
      }),
      Vc = (a._emscripten_bind_b2World_CreateParticleSystem_1 = function () {
        return (Vc = a._emscripten_bind_b2World_CreateParticleSystem_1 =
          a.asm.bb).apply(null, arguments);
      }),
      Wc = (a._emscripten_bind_b2World_DestroyParticleSystem_1 = function () {
        return (Wc = a._emscripten_bind_b2World_DestroyParticleSystem_1 =
          a.asm.cb).apply(null, arguments);
      }),
      Xc = (a._emscripten_bind_b2World_CalculateReasonableParticleIterations_1 =
        function () {
          return (Xc =
            a._emscripten_bind_b2World_CalculateReasonableParticleIterations_1 =
              a.asm.db).apply(null, arguments);
        }),
      Yc = (a._emscripten_bind_b2World_Step_3 = function () {
        return (Yc = a._emscripten_bind_b2World_Step_3 = a.asm.eb).apply(
          null,
          arguments,
        );
      }),
      Zc = (a._emscripten_bind_b2World_Step_4 = function () {
        return (Zc = a._emscripten_bind_b2World_Step_4 = a.asm.fb).apply(
          null,
          arguments,
        );
      }),
      $c = (a._emscripten_bind_b2World_ClearForces_0 = function () {
        return ($c = a._emscripten_bind_b2World_ClearForces_0 = a.asm.gb).apply(
          null,
          arguments,
        );
      }),
      ad = (a._emscripten_bind_b2World_DebugDraw_0 = function () {
        return (ad = a._emscripten_bind_b2World_DebugDraw_0 = a.asm.hb).apply(
          null,
          arguments,
        );
      }),
      bd = (a._emscripten_bind_b2World_QueryAABB_2 = function () {
        return (bd = a._emscripten_bind_b2World_QueryAABB_2 = a.asm.ib).apply(
          null,
          arguments,
        );
      }),
      cd = (a._emscripten_bind_b2World_RayCast_3 = function () {
        return (cd = a._emscripten_bind_b2World_RayCast_3 = a.asm.jb).apply(
          null,
          arguments,
        );
      }),
      dd = (a._emscripten_bind_b2World_GetBodyList_0 = function () {
        return (dd = a._emscripten_bind_b2World_GetBodyList_0 = a.asm.kb).apply(
          null,
          arguments,
        );
      }),
      ed = (a._emscripten_bind_b2World_GetJointList_0 = function () {
        return (ed = a._emscripten_bind_b2World_GetJointList_0 =
          a.asm.lb).apply(null, arguments);
      }),
      fd = (a._emscripten_bind_b2World_GetContactList_0 = function () {
        return (fd = a._emscripten_bind_b2World_GetContactList_0 =
          a.asm.mb).apply(null, arguments);
      }),
      gd = (a._emscripten_bind_b2World_SetAllowSleeping_1 = function () {
        return (gd = a._emscripten_bind_b2World_SetAllowSleeping_1 =
          a.asm.nb).apply(null, arguments);
      }),
      hd = (a._emscripten_bind_b2World_GetAllowSleeping_0 = function () {
        return (hd = a._emscripten_bind_b2World_GetAllowSleeping_0 =
          a.asm.ob).apply(null, arguments);
      }),
      jd = (a._emscripten_bind_b2World_SetWarmStarting_1 = function () {
        return (jd = a._emscripten_bind_b2World_SetWarmStarting_1 =
          a.asm.pb).apply(null, arguments);
      }),
      kd = (a._emscripten_bind_b2World_GetWarmStarting_0 = function () {
        return (kd = a._emscripten_bind_b2World_GetWarmStarting_0 =
          a.asm.qb).apply(null, arguments);
      }),
      ld = (a._emscripten_bind_b2World_SetContinuousPhysics_1 = function () {
        return (ld = a._emscripten_bind_b2World_SetContinuousPhysics_1 =
          a.asm.rb).apply(null, arguments);
      }),
      md = (a._emscripten_bind_b2World_GetContinuousPhysics_0 = function () {
        return (md = a._emscripten_bind_b2World_GetContinuousPhysics_0 =
          a.asm.sb).apply(null, arguments);
      }),
      nd = (a._emscripten_bind_b2World_SetSubStepping_1 = function () {
        return (nd = a._emscripten_bind_b2World_SetSubStepping_1 =
          a.asm.tb).apply(null, arguments);
      }),
      od = (a._emscripten_bind_b2World_GetSubStepping_0 = function () {
        return (od = a._emscripten_bind_b2World_GetSubStepping_0 =
          a.asm.ub).apply(null, arguments);
      }),
      pd = (a._emscripten_bind_b2World_GetProxyCount_0 = function () {
        return (pd = a._emscripten_bind_b2World_GetProxyCount_0 =
          a.asm.vb).apply(null, arguments);
      }),
      qd = (a._emscripten_bind_b2World_GetBodyCount_0 = function () {
        return (qd = a._emscripten_bind_b2World_GetBodyCount_0 =
          a.asm.wb).apply(null, arguments);
      }),
      rd = (a._emscripten_bind_b2World_GetJointCount_0 = function () {
        return (rd = a._emscripten_bind_b2World_GetJointCount_0 =
          a.asm.xb).apply(null, arguments);
      }),
      sd = (a._emscripten_bind_b2World_GetContactCount_0 = function () {
        return (sd = a._emscripten_bind_b2World_GetContactCount_0 =
          a.asm.yb).apply(null, arguments);
      }),
      td = (a._emscripten_bind_b2World_GetTreeHeight_0 = function () {
        return (td = a._emscripten_bind_b2World_GetTreeHeight_0 =
          a.asm.zb).apply(null, arguments);
      }),
      ud = (a._emscripten_bind_b2World_GetTreeBalance_0 = function () {
        return (ud = a._emscripten_bind_b2World_GetTreeBalance_0 =
          a.asm.Ab).apply(null, arguments);
      }),
      vd = (a._emscripten_bind_b2World_GetTreeQuality_0 = function () {
        return (vd = a._emscripten_bind_b2World_GetTreeQuality_0 =
          a.asm.Bb).apply(null, arguments);
      }),
      wd = (a._emscripten_bind_b2World_SetGravity_1 = function () {
        return (wd = a._emscripten_bind_b2World_SetGravity_1 = a.asm.Cb).apply(
          null,
          arguments,
        );
      }),
      xd = (a._emscripten_bind_b2World_GetGravity_0 = function () {
        return (xd = a._emscripten_bind_b2World_GetGravity_0 = a.asm.Db).apply(
          null,
          arguments,
        );
      }),
      yd = (a._emscripten_bind_b2World_IsLocked_0 = function () {
        return (yd = a._emscripten_bind_b2World_IsLocked_0 = a.asm.Eb).apply(
          null,
          arguments,
        );
      }),
      zd = (a._emscripten_bind_b2World_SetAutoClearForces_1 = function () {
        return (zd = a._emscripten_bind_b2World_SetAutoClearForces_1 =
          a.asm.Fb).apply(null, arguments);
      }),
      Ad = (a._emscripten_bind_b2World_GetAutoClearForces_0 = function () {
        return (Ad = a._emscripten_bind_b2World_GetAutoClearForces_0 =
          a.asm.Gb).apply(null, arguments);
      }),
      Bd = (a._emscripten_bind_b2World_GetProfile_0 = function () {
        return (Bd = a._emscripten_bind_b2World_GetProfile_0 = a.asm.Hb).apply(
          null,
          arguments,
        );
      }),
      Cd = (a._emscripten_bind_b2World_Dump_0 = function () {
        return (Cd = a._emscripten_bind_b2World_Dump_0 = a.asm.Ib).apply(
          null,
          arguments,
        );
      }),
      Dd = (a._emscripten_bind_b2World___destroy___0 = function () {
        return (Dd = a._emscripten_bind_b2World___destroy___0 = a.asm.Jb).apply(
          null,
          arguments,
        );
      }),
      Ed = (a._emscripten_bind_b2FixtureUserData_get_pointer_0 = function () {
        return (Ed = a._emscripten_bind_b2FixtureUserData_get_pointer_0 =
          a.asm.Kb).apply(null, arguments);
      }),
      Fd = (a._emscripten_bind_b2FixtureUserData_set_pointer_1 = function () {
        return (Fd = a._emscripten_bind_b2FixtureUserData_set_pointer_1 =
          a.asm.Lb).apply(null, arguments);
      }),
      Gd = (a._emscripten_bind_b2FixtureUserData___destroy___0 = function () {
        return (Gd = a._emscripten_bind_b2FixtureUserData___destroy___0 =
          a.asm.Mb).apply(null, arguments);
      }),
      Hd = (a._emscripten_bind_b2FixtureDef_b2FixtureDef_0 = function () {
        return (Hd = a._emscripten_bind_b2FixtureDef_b2FixtureDef_0 =
          a.asm.Nb).apply(null, arguments);
      }),
      Id = (a._emscripten_bind_b2FixtureDef_get_shape_0 = function () {
        return (Id = a._emscripten_bind_b2FixtureDef_get_shape_0 =
          a.asm.Ob).apply(null, arguments);
      }),
      Jd = (a._emscripten_bind_b2FixtureDef_set_shape_1 = function () {
        return (Jd = a._emscripten_bind_b2FixtureDef_set_shape_1 =
          a.asm.Pb).apply(null, arguments);
      }),
      Kd = (a._emscripten_bind_b2FixtureDef_get_userData_0 = function () {
        return (Kd = a._emscripten_bind_b2FixtureDef_get_userData_0 =
          a.asm.Qb).apply(null, arguments);
      }),
      Ld = (a._emscripten_bind_b2FixtureDef_set_userData_1 = function () {
        return (Ld = a._emscripten_bind_b2FixtureDef_set_userData_1 =
          a.asm.Rb).apply(null, arguments);
      }),
      Md = (a._emscripten_bind_b2FixtureDef_get_friction_0 = function () {
        return (Md = a._emscripten_bind_b2FixtureDef_get_friction_0 =
          a.asm.Sb).apply(null, arguments);
      }),
      Nd = (a._emscripten_bind_b2FixtureDef_set_friction_1 = function () {
        return (Nd = a._emscripten_bind_b2FixtureDef_set_friction_1 =
          a.asm.Tb).apply(null, arguments);
      }),
      Od = (a._emscripten_bind_b2FixtureDef_get_restitution_0 = function () {
        return (Od = a._emscripten_bind_b2FixtureDef_get_restitution_0 =
          a.asm.Ub).apply(null, arguments);
      }),
      Pd = (a._emscripten_bind_b2FixtureDef_set_restitution_1 = function () {
        return (Pd = a._emscripten_bind_b2FixtureDef_set_restitution_1 =
          a.asm.Vb).apply(null, arguments);
      }),
      Qd = (a._emscripten_bind_b2FixtureDef_get_restitutionThreshold_0 =
        function () {
          return (Qd =
            a._emscripten_bind_b2FixtureDef_get_restitutionThreshold_0 =
              a.asm.Wb).apply(null, arguments);
        }),
      Rd = (a._emscripten_bind_b2FixtureDef_set_restitutionThreshold_1 =
        function () {
          return (Rd =
            a._emscripten_bind_b2FixtureDef_set_restitutionThreshold_1 =
              a.asm.Xb).apply(null, arguments);
        }),
      Sd = (a._emscripten_bind_b2FixtureDef_get_density_0 = function () {
        return (Sd = a._emscripten_bind_b2FixtureDef_get_density_0 =
          a.asm.Yb).apply(null, arguments);
      }),
      Td = (a._emscripten_bind_b2FixtureDef_set_density_1 = function () {
        return (Td = a._emscripten_bind_b2FixtureDef_set_density_1 =
          a.asm.Zb).apply(null, arguments);
      }),
      Ud = (a._emscripten_bind_b2FixtureDef_get_isSensor_0 = function () {
        return (Ud = a._emscripten_bind_b2FixtureDef_get_isSensor_0 =
          a.asm._b).apply(null, arguments);
      }),
      Vd = (a._emscripten_bind_b2FixtureDef_set_isSensor_1 = function () {
        return (Vd = a._emscripten_bind_b2FixtureDef_set_isSensor_1 =
          a.asm.$b).apply(null, arguments);
      }),
      Wd = (a._emscripten_bind_b2FixtureDef_get_filter_0 = function () {
        return (Wd = a._emscripten_bind_b2FixtureDef_get_filter_0 =
          a.asm.ac).apply(null, arguments);
      }),
      Xd = (a._emscripten_bind_b2FixtureDef_set_filter_1 = function () {
        return (Xd = a._emscripten_bind_b2FixtureDef_set_filter_1 =
          a.asm.bc).apply(null, arguments);
      }),
      Yd = (a._emscripten_bind_b2FixtureDef___destroy___0 = function () {
        return (Yd = a._emscripten_bind_b2FixtureDef___destroy___0 =
          a.asm.cc).apply(null, arguments);
      }),
      Zd = (a._emscripten_bind_b2Fixture_GetType_0 = function () {
        return (Zd = a._emscripten_bind_b2Fixture_GetType_0 = a.asm.dc).apply(
          null,
          arguments,
        );
      }),
      $d = (a._emscripten_bind_b2Fixture_GetShape_0 = function () {
        return ($d = a._emscripten_bind_b2Fixture_GetShape_0 = a.asm.ec).apply(
          null,
          arguments,
        );
      }),
      ae = (a._emscripten_bind_b2Fixture_SetSensor_1 = function () {
        return (ae = a._emscripten_bind_b2Fixture_SetSensor_1 = a.asm.fc).apply(
          null,
          arguments,
        );
      }),
      be = (a._emscripten_bind_b2Fixture_IsSensor_0 = function () {
        return (be = a._emscripten_bind_b2Fixture_IsSensor_0 = a.asm.gc).apply(
          null,
          arguments,
        );
      }),
      ce = (a._emscripten_bind_b2Fixture_SetFilterData_1 = function () {
        return (ce = a._emscripten_bind_b2Fixture_SetFilterData_1 =
          a.asm.hc).apply(null, arguments);
      }),
      de = (a._emscripten_bind_b2Fixture_GetFilterData_0 = function () {
        return (de = a._emscripten_bind_b2Fixture_GetFilterData_0 =
          a.asm.ic).apply(null, arguments);
      }),
      ee = (a._emscripten_bind_b2Fixture_Refilter_0 = function () {
        return (ee = a._emscripten_bind_b2Fixture_Refilter_0 = a.asm.jc).apply(
          null,
          arguments,
        );
      }),
      fe = (a._emscripten_bind_b2Fixture_GetBody_0 = function () {
        return (fe = a._emscripten_bind_b2Fixture_GetBody_0 = a.asm.kc).apply(
          null,
          arguments,
        );
      }),
      ge = (a._emscripten_bind_b2Fixture_GetNext_0 = function () {
        return (ge = a._emscripten_bind_b2Fixture_GetNext_0 = a.asm.lc).apply(
          null,
          arguments,
        );
      }),
      he = (a._emscripten_bind_b2Fixture_GetUserData_0 = function () {
        return (he = a._emscripten_bind_b2Fixture_GetUserData_0 =
          a.asm.mc).apply(null, arguments);
      }),
      ie = (a._emscripten_bind_b2Fixture_TestPoint_1 = function () {
        return (ie = a._emscripten_bind_b2Fixture_TestPoint_1 = a.asm.nc).apply(
          null,
          arguments,
        );
      }),
      je = (a._emscripten_bind_b2Fixture_RayCast_3 = function () {
        return (je = a._emscripten_bind_b2Fixture_RayCast_3 = a.asm.oc).apply(
          null,
          arguments,
        );
      }),
      ke = (a._emscripten_bind_b2Fixture_GetMassData_1 = function () {
        return (ke = a._emscripten_bind_b2Fixture_GetMassData_1 =
          a.asm.pc).apply(null, arguments);
      }),
      le = (a._emscripten_bind_b2Fixture_SetDensity_1 = function () {
        return (le = a._emscripten_bind_b2Fixture_SetDensity_1 =
          a.asm.qc).apply(null, arguments);
      }),
      me = (a._emscripten_bind_b2Fixture_GetDensity_0 = function () {
        return (me = a._emscripten_bind_b2Fixture_GetDensity_0 =
          a.asm.rc).apply(null, arguments);
      }),
      ne = (a._emscripten_bind_b2Fixture_GetFriction_0 = function () {
        return (ne = a._emscripten_bind_b2Fixture_GetFriction_0 =
          a.asm.sc).apply(null, arguments);
      }),
      oe = (a._emscripten_bind_b2Fixture_SetFriction_1 = function () {
        return (oe = a._emscripten_bind_b2Fixture_SetFriction_1 =
          a.asm.tc).apply(null, arguments);
      }),
      pe = (a._emscripten_bind_b2Fixture_GetRestitution_0 = function () {
        return (pe = a._emscripten_bind_b2Fixture_GetRestitution_0 =
          a.asm.uc).apply(null, arguments);
      }),
      qe = (a._emscripten_bind_b2Fixture_SetRestitution_1 = function () {
        return (qe = a._emscripten_bind_b2Fixture_SetRestitution_1 =
          a.asm.vc).apply(null, arguments);
      }),
      re = (a._emscripten_bind_b2Fixture_GetRestitutionThreshold_0 =
        function () {
          return (re = a._emscripten_bind_b2Fixture_GetRestitutionThreshold_0 =
            a.asm.wc).apply(null, arguments);
        }),
      se = (a._emscripten_bind_b2Fixture_SetRestitutionThreshold_1 =
        function () {
          return (se = a._emscripten_bind_b2Fixture_SetRestitutionThreshold_1 =
            a.asm.xc).apply(null, arguments);
        }),
      te = (a._emscripten_bind_b2Fixture_GetAABB_1 = function () {
        return (te = a._emscripten_bind_b2Fixture_GetAABB_1 = a.asm.yc).apply(
          null,
          arguments,
        );
      }),
      ue = (a._emscripten_bind_b2Fixture_Dump_1 = function () {
        return (ue = a._emscripten_bind_b2Fixture_Dump_1 = a.asm.zc).apply(
          null,
          arguments,
        );
      }),
      ve = (a._emscripten_bind_b2Fixture___destroy___0 = function () {
        return (ve = a._emscripten_bind_b2Fixture___destroy___0 =
          a.asm.Ac).apply(null, arguments);
      }),
      we = (a._emscripten_bind_b2Transform_b2Transform_0 = function () {
        return (we = a._emscripten_bind_b2Transform_b2Transform_0 =
          a.asm.Bc).apply(null, arguments);
      }),
      xe = (a._emscripten_bind_b2Transform_b2Transform_2 = function () {
        return (xe = a._emscripten_bind_b2Transform_b2Transform_2 =
          a.asm.Cc).apply(null, arguments);
      }),
      ye = (a._emscripten_bind_b2Transform_SetIdentity_0 = function () {
        return (ye = a._emscripten_bind_b2Transform_SetIdentity_0 =
          a.asm.Dc).apply(null, arguments);
      }),
      ze = (a._emscripten_bind_b2Transform_Set_2 = function () {
        return (ze = a._emscripten_bind_b2Transform_Set_2 = a.asm.Ec).apply(
          null,
          arguments,
        );
      }),
      Ae = (a._emscripten_bind_b2Transform_get_p_0 = function () {
        return (Ae = a._emscripten_bind_b2Transform_get_p_0 = a.asm.Fc).apply(
          null,
          arguments,
        );
      }),
      Be = (a._emscripten_bind_b2Transform_set_p_1 = function () {
        return (Be = a._emscripten_bind_b2Transform_set_p_1 = a.asm.Gc).apply(
          null,
          arguments,
        );
      }),
      Ce = (a._emscripten_bind_b2Transform_get_q_0 = function () {
        return (Ce = a._emscripten_bind_b2Transform_get_q_0 = a.asm.Hc).apply(
          null,
          arguments,
        );
      }),
      De = (a._emscripten_bind_b2Transform_set_q_1 = function () {
        return (De = a._emscripten_bind_b2Transform_set_q_1 = a.asm.Ic).apply(
          null,
          arguments,
        );
      }),
      Ee = (a._emscripten_bind_b2Transform___destroy___0 = function () {
        return (Ee = a._emscripten_bind_b2Transform___destroy___0 =
          a.asm.Jc).apply(null, arguments);
      }),
      Fe = (a._emscripten_bind_JSRayCastCallback_JSRayCastCallback_0 =
        function () {
          return (Fe =
            a._emscripten_bind_JSRayCastCallback_JSRayCastCallback_0 =
              a.asm.Kc).apply(null, arguments);
        }),
      Ge = (a._emscripten_bind_JSRayCastCallback_ReportFixture_4 = function () {
        return (Ge = a._emscripten_bind_JSRayCastCallback_ReportFixture_4 =
          a.asm.Lc).apply(null, arguments);
      }),
      He = (a._emscripten_bind_JSRayCastCallback_ReportParticle_5 =
        function () {
          return (He = a._emscripten_bind_JSRayCastCallback_ReportParticle_5 =
            a.asm.Mc).apply(null, arguments);
        }),
      Ie = (a._emscripten_bind_JSRayCastCallback_ShouldQueryParticleSystem_1 =
        function () {
          return (Ie =
            a._emscripten_bind_JSRayCastCallback_ShouldQueryParticleSystem_1 =
              a.asm.Nc).apply(null, arguments);
        }),
      Je = (a._emscripten_bind_JSRayCastCallback___destroy___0 = function () {
        return (Je = a._emscripten_bind_JSRayCastCallback___destroy___0 =
          a.asm.Oc).apply(null, arguments);
      }),
      Ke = (a._emscripten_bind_JSQueryCallback_JSQueryCallback_0 = function () {
        return (Ke = a._emscripten_bind_JSQueryCallback_JSQueryCallback_0 =
          a.asm.Pc).apply(null, arguments);
      }),
      Le = (a._emscripten_bind_JSQueryCallback_ReportFixture_1 = function () {
        return (Le = a._emscripten_bind_JSQueryCallback_ReportFixture_1 =
          a.asm.Qc).apply(null, arguments);
      }),
      Me = (a._emscripten_bind_JSQueryCallback_ReportParticle_2 = function () {
        return (Me = a._emscripten_bind_JSQueryCallback_ReportParticle_2 =
          a.asm.Rc).apply(null, arguments);
      }),
      Ne = (a._emscripten_bind_JSQueryCallback_ShouldQueryParticleSystem_1 =
        function () {
          return (Ne =
            a._emscripten_bind_JSQueryCallback_ShouldQueryParticleSystem_1 =
              a.asm.Sc).apply(null, arguments);
        }),
      Oe = (a._emscripten_bind_JSQueryCallback___destroy___0 = function () {
        return (Oe = a._emscripten_bind_JSQueryCallback___destroy___0 =
          a.asm.Tc).apply(null, arguments);
      }),
      Pe = (a._emscripten_bind_b2MassData_b2MassData_0 = function () {
        return (Pe = a._emscripten_bind_b2MassData_b2MassData_0 =
          a.asm.Uc).apply(null, arguments);
      }),
      Qe = (a._emscripten_bind_b2MassData_get_mass_0 = function () {
        return (Qe = a._emscripten_bind_b2MassData_get_mass_0 = a.asm.Vc).apply(
          null,
          arguments,
        );
      }),
      Re = (a._emscripten_bind_b2MassData_set_mass_1 = function () {
        return (Re = a._emscripten_bind_b2MassData_set_mass_1 = a.asm.Wc).apply(
          null,
          arguments,
        );
      }),
      Se = (a._emscripten_bind_b2MassData_get_center_0 = function () {
        return (Se = a._emscripten_bind_b2MassData_get_center_0 =
          a.asm.Xc).apply(null, arguments);
      }),
      Te = (a._emscripten_bind_b2MassData_set_center_1 = function () {
        return (Te = a._emscripten_bind_b2MassData_set_center_1 =
          a.asm.Yc).apply(null, arguments);
      }),
      Ue = (a._emscripten_bind_b2MassData_get_I_0 = function () {
        return (Ue = a._emscripten_bind_b2MassData_get_I_0 = a.asm.Zc).apply(
          null,
          arguments,
        );
      }),
      Ve = (a._emscripten_bind_b2MassData_set_I_1 = function () {
        return (Ve = a._emscripten_bind_b2MassData_set_I_1 = a.asm._c).apply(
          null,
          arguments,
        );
      }),
      We = (a._emscripten_bind_b2MassData___destroy___0 = function () {
        return (We = a._emscripten_bind_b2MassData___destroy___0 =
          a.asm.$c).apply(null, arguments);
      }),
      Xe = (a._emscripten_bind_b2Vec2_b2Vec2_0 = function () {
        return (Xe = a._emscripten_bind_b2Vec2_b2Vec2_0 = a.asm.ad).apply(
          null,
          arguments,
        );
      }),
      Ye = (a._emscripten_bind_b2Vec2_b2Vec2_2 = function () {
        return (Ye = a._emscripten_bind_b2Vec2_b2Vec2_2 = a.asm.bd).apply(
          null,
          arguments,
        );
      }),
      Ze = (a._emscripten_bind_b2Vec2_SetZero_0 = function () {
        return (Ze = a._emscripten_bind_b2Vec2_SetZero_0 = a.asm.cd).apply(
          null,
          arguments,
        );
      }),
      $e = (a._emscripten_bind_b2Vec2_Set_2 = function () {
        return ($e = a._emscripten_bind_b2Vec2_Set_2 = a.asm.dd).apply(
          null,
          arguments,
        );
      }),
      af = (a._emscripten_bind_b2Vec2_op_add_1 = function () {
        return (af = a._emscripten_bind_b2Vec2_op_add_1 = a.asm.ed).apply(
          null,
          arguments,
        );
      }),
      bf = (a._emscripten_bind_b2Vec2_op_sub_1 = function () {
        return (bf = a._emscripten_bind_b2Vec2_op_sub_1 = a.asm.fd).apply(
          null,
          arguments,
        );
      }),
      cf = (a._emscripten_bind_b2Vec2_op_mul_1 = function () {
        return (cf = a._emscripten_bind_b2Vec2_op_mul_1 = a.asm.gd).apply(
          null,
          arguments,
        );
      }),
      df = (a._emscripten_bind_b2Vec2_Length_0 = function () {
        return (df = a._emscripten_bind_b2Vec2_Length_0 = a.asm.hd).apply(
          null,
          arguments,
        );
      }),
      ef = (a._emscripten_bind_b2Vec2_LengthSquared_0 = function () {
        return (ef = a._emscripten_bind_b2Vec2_LengthSquared_0 =
          a.asm.id).apply(null, arguments);
      }),
      ff = (a._emscripten_bind_b2Vec2_Normalize_0 = function () {
        return (ff = a._emscripten_bind_b2Vec2_Normalize_0 = a.asm.jd).apply(
          null,
          arguments,
        );
      }),
      gf = (a._emscripten_bind_b2Vec2_IsValid_0 = function () {
        return (gf = a._emscripten_bind_b2Vec2_IsValid_0 = a.asm.kd).apply(
          null,
          arguments,
        );
      }),
      hf = (a._emscripten_bind_b2Vec2_Skew_0 = function () {
        return (hf = a._emscripten_bind_b2Vec2_Skew_0 = a.asm.ld).apply(
          null,
          arguments,
        );
      }),
      jf = (a._emscripten_bind_b2Vec2_get_x_0 = function () {
        return (jf = a._emscripten_bind_b2Vec2_get_x_0 = a.asm.md).apply(
          null,
          arguments,
        );
      }),
      kf = (a._emscripten_bind_b2Vec2_set_x_1 = function () {
        return (kf = a._emscripten_bind_b2Vec2_set_x_1 = a.asm.nd).apply(
          null,
          arguments,
        );
      }),
      lf = (a._emscripten_bind_b2Vec2_get_y_0 = function () {
        return (lf = a._emscripten_bind_b2Vec2_get_y_0 = a.asm.od).apply(
          null,
          arguments,
        );
      }),
      mf = (a._emscripten_bind_b2Vec2_set_y_1 = function () {
        return (mf = a._emscripten_bind_b2Vec2_set_y_1 = a.asm.pd).apply(
          null,
          arguments,
        );
      }),
      nf = (a._emscripten_bind_b2Vec2___destroy___0 = function () {
        return (nf = a._emscripten_bind_b2Vec2___destroy___0 = a.asm.qd).apply(
          null,
          arguments,
        );
      }),
      of = (a._emscripten_bind_b2Vec3_b2Vec3_0 = function () {
        return (of = a._emscripten_bind_b2Vec3_b2Vec3_0 = a.asm.rd).apply(
          null,
          arguments,
        );
      }),
      pf = (a._emscripten_bind_b2Vec3_b2Vec3_3 = function () {
        return (pf = a._emscripten_bind_b2Vec3_b2Vec3_3 = a.asm.sd).apply(
          null,
          arguments,
        );
      }),
      qf = (a._emscripten_bind_b2Vec3_SetZero_0 = function () {
        return (qf = a._emscripten_bind_b2Vec3_SetZero_0 = a.asm.td).apply(
          null,
          arguments,
        );
      }),
      rf = (a._emscripten_bind_b2Vec3_Set_3 = function () {
        return (rf = a._emscripten_bind_b2Vec3_Set_3 = a.asm.ud).apply(
          null,
          arguments,
        );
      }),
      sf = (a._emscripten_bind_b2Vec3_Length_0 = function () {
        return (sf = a._emscripten_bind_b2Vec3_Length_0 = a.asm.vd).apply(
          null,
          arguments,
        );
      }),
      tf = (a._emscripten_bind_b2Vec3_Normalize_0 = function () {
        return (tf = a._emscripten_bind_b2Vec3_Normalize_0 = a.asm.wd).apply(
          null,
          arguments,
        );
      }),
      uf = (a._emscripten_bind_b2Vec3_op_add_1 = function () {
        return (uf = a._emscripten_bind_b2Vec3_op_add_1 = a.asm.xd).apply(
          null,
          arguments,
        );
      }),
      vf = (a._emscripten_bind_b2Vec3_op_sub_1 = function () {
        return (vf = a._emscripten_bind_b2Vec3_op_sub_1 = a.asm.yd).apply(
          null,
          arguments,
        );
      }),
      wf = (a._emscripten_bind_b2Vec3_op_mul_1 = function () {
        return (wf = a._emscripten_bind_b2Vec3_op_mul_1 = a.asm.zd).apply(
          null,
          arguments,
        );
      }),
      xf = (a._emscripten_bind_b2Vec3_get_x_0 = function () {
        return (xf = a._emscripten_bind_b2Vec3_get_x_0 = a.asm.Ad).apply(
          null,
          arguments,
        );
      }),
      yf = (a._emscripten_bind_b2Vec3_set_x_1 = function () {
        return (yf = a._emscripten_bind_b2Vec3_set_x_1 = a.asm.Bd).apply(
          null,
          arguments,
        );
      }),
      zf = (a._emscripten_bind_b2Vec3_get_y_0 = function () {
        return (zf = a._emscripten_bind_b2Vec3_get_y_0 = a.asm.Cd).apply(
          null,
          arguments,
        );
      }),
      Af = (a._emscripten_bind_b2Vec3_set_y_1 = function () {
        return (Af = a._emscripten_bind_b2Vec3_set_y_1 = a.asm.Dd).apply(
          null,
          arguments,
        );
      }),
      Bf = (a._emscripten_bind_b2Vec3_get_z_0 = function () {
        return (Bf = a._emscripten_bind_b2Vec3_get_z_0 = a.asm.Ed).apply(
          null,
          arguments,
        );
      }),
      Cf = (a._emscripten_bind_b2Vec3_set_z_1 = function () {
        return (Cf = a._emscripten_bind_b2Vec3_set_z_1 = a.asm.Fd).apply(
          null,
          arguments,
        );
      }),
      Df = (a._emscripten_bind_b2Vec3___destroy___0 = function () {
        return (Df = a._emscripten_bind_b2Vec3___destroy___0 = a.asm.Gd).apply(
          null,
          arguments,
        );
      }),
      Ef = (a._emscripten_bind_b2Vec4_b2Vec4_0 = function () {
        return (Ef = a._emscripten_bind_b2Vec4_b2Vec4_0 = a.asm.Hd).apply(
          null,
          arguments,
        );
      }),
      Ff = (a._emscripten_bind_b2Vec4_b2Vec4_4 = function () {
        return (Ff = a._emscripten_bind_b2Vec4_b2Vec4_4 = a.asm.Id).apply(
          null,
          arguments,
        );
      }),
      Gf = (a._emscripten_bind_b2Vec4_get_x_0 = function () {
        return (Gf = a._emscripten_bind_b2Vec4_get_x_0 = a.asm.Jd).apply(
          null,
          arguments,
        );
      }),
      Hf = (a._emscripten_bind_b2Vec4_set_x_1 = function () {
        return (Hf = a._emscripten_bind_b2Vec4_set_x_1 = a.asm.Kd).apply(
          null,
          arguments,
        );
      }),
      If = (a._emscripten_bind_b2Vec4_get_y_0 = function () {
        return (If = a._emscripten_bind_b2Vec4_get_y_0 = a.asm.Ld).apply(
          null,
          arguments,
        );
      }),
      Jf = (a._emscripten_bind_b2Vec4_set_y_1 = function () {
        return (Jf = a._emscripten_bind_b2Vec4_set_y_1 = a.asm.Md).apply(
          null,
          arguments,
        );
      }),
      Kf = (a._emscripten_bind_b2Vec4_get_z_0 = function () {
        return (Kf = a._emscripten_bind_b2Vec4_get_z_0 = a.asm.Nd).apply(
          null,
          arguments,
        );
      }),
      Lf = (a._emscripten_bind_b2Vec4_set_z_1 = function () {
        return (Lf = a._emscripten_bind_b2Vec4_set_z_1 = a.asm.Od).apply(
          null,
          arguments,
        );
      }),
      Mf = (a._emscripten_bind_b2Vec4_get_w_0 = function () {
        return (Mf = a._emscripten_bind_b2Vec4_get_w_0 = a.asm.Pd).apply(
          null,
          arguments,
        );
      }),
      Nf = (a._emscripten_bind_b2Vec4_set_w_1 = function () {
        return (Nf = a._emscripten_bind_b2Vec4_set_w_1 = a.asm.Qd).apply(
          null,
          arguments,
        );
      }),
      Of = (a._emscripten_bind_b2Vec4___destroy___0 = function () {
        return (Of = a._emscripten_bind_b2Vec4___destroy___0 = a.asm.Rd).apply(
          null,
          arguments,
        );
      }),
      Pf = (a._emscripten_bind_b2BodyUserData_get_pointer_0 = function () {
        return (Pf = a._emscripten_bind_b2BodyUserData_get_pointer_0 =
          a.asm.Sd).apply(null, arguments);
      }),
      Qf = (a._emscripten_bind_b2BodyUserData_set_pointer_1 = function () {
        return (Qf = a._emscripten_bind_b2BodyUserData_set_pointer_1 =
          a.asm.Td).apply(null, arguments);
      }),
      Rf = (a._emscripten_bind_b2BodyUserData___destroy___0 = function () {
        return (Rf = a._emscripten_bind_b2BodyUserData___destroy___0 =
          a.asm.Ud).apply(null, arguments);
      }),
      Sf = (a._emscripten_bind_b2Body_CreateFixture_1 = function () {
        return (Sf = a._emscripten_bind_b2Body_CreateFixture_1 =
          a.asm.Vd).apply(null, arguments);
      }),
      Tf = (a._emscripten_bind_b2Body_CreateFixture_2 = function () {
        return (Tf = a._emscripten_bind_b2Body_CreateFixture_2 =
          a.asm.Wd).apply(null, arguments);
      }),
      Uf = (a._emscripten_bind_b2Body_DestroyFixture_1 = function () {
        return (Uf = a._emscripten_bind_b2Body_DestroyFixture_1 =
          a.asm.Xd).apply(null, arguments);
      }),
      Vf = (a._emscripten_bind_b2Body_SetTransform_2 = function () {
        return (Vf = a._emscripten_bind_b2Body_SetTransform_2 = a.asm.Yd).apply(
          null,
          arguments,
        );
      }),
      Wf = (a._emscripten_bind_b2Body_GetTransform_0 = function () {
        return (Wf = a._emscripten_bind_b2Body_GetTransform_0 = a.asm.Zd).apply(
          null,
          arguments,
        );
      }),
      Xf = (a._emscripten_bind_b2Body_GetPosition_0 = function () {
        return (Xf = a._emscripten_bind_b2Body_GetPosition_0 = a.asm._d).apply(
          null,
          arguments,
        );
      }),
      Yf = (a._emscripten_bind_b2Body_GetAngle_0 = function () {
        return (Yf = a._emscripten_bind_b2Body_GetAngle_0 = a.asm.$d).apply(
          null,
          arguments,
        );
      }),
      Zf = (a._emscripten_bind_b2Body_GetWorldCenter_0 = function () {
        return (Zf = a._emscripten_bind_b2Body_GetWorldCenter_0 =
          a.asm.ae).apply(null, arguments);
      }),
      $f = (a._emscripten_bind_b2Body_GetLocalCenter_0 = function () {
        return ($f = a._emscripten_bind_b2Body_GetLocalCenter_0 =
          a.asm.be).apply(null, arguments);
      }),
      ag = (a._emscripten_bind_b2Body_SetLinearVelocity_1 = function () {
        return (ag = a._emscripten_bind_b2Body_SetLinearVelocity_1 =
          a.asm.ce).apply(null, arguments);
      }),
      bg = (a._emscripten_bind_b2Body_GetLinearVelocity_0 = function () {
        return (bg = a._emscripten_bind_b2Body_GetLinearVelocity_0 =
          a.asm.de).apply(null, arguments);
      }),
      cg = (a._emscripten_bind_b2Body_SetAngularVelocity_1 = function () {
        return (cg = a._emscripten_bind_b2Body_SetAngularVelocity_1 =
          a.asm.ee).apply(null, arguments);
      }),
      dg = (a._emscripten_bind_b2Body_GetAngularVelocity_0 = function () {
        return (dg = a._emscripten_bind_b2Body_GetAngularVelocity_0 =
          a.asm.fe).apply(null, arguments);
      }),
      eg = (a._emscripten_bind_b2Body_ApplyForce_3 = function () {
        return (eg = a._emscripten_bind_b2Body_ApplyForce_3 = a.asm.ge).apply(
          null,
          arguments,
        );
      }),
      fg = (a._emscripten_bind_b2Body_ApplyForceToCenter_2 = function () {
        return (fg = a._emscripten_bind_b2Body_ApplyForceToCenter_2 =
          a.asm.he).apply(null, arguments);
      }),
      gg = (a._emscripten_bind_b2Body_ApplyTorque_2 = function () {
        return (gg = a._emscripten_bind_b2Body_ApplyTorque_2 = a.asm.ie).apply(
          null,
          arguments,
        );
      }),
      hg = (a._emscripten_bind_b2Body_ApplyLinearImpulse_3 = function () {
        return (hg = a._emscripten_bind_b2Body_ApplyLinearImpulse_3 =
          a.asm.je).apply(null, arguments);
      }),
      ig = (a._emscripten_bind_b2Body_ApplyAngularImpulse_2 = function () {
        return (ig = a._emscripten_bind_b2Body_ApplyAngularImpulse_2 =
          a.asm.ke).apply(null, arguments);
      }),
      jg = (a._emscripten_bind_b2Body_GetMass_0 = function () {
        return (jg = a._emscripten_bind_b2Body_GetMass_0 = a.asm.le).apply(
          null,
          arguments,
        );
      }),
      kg = (a._emscripten_bind_b2Body_GetInertia_0 = function () {
        return (kg = a._emscripten_bind_b2Body_GetInertia_0 = a.asm.me).apply(
          null,
          arguments,
        );
      }),
      lg = (a._emscripten_bind_b2Body_GetMassData_1 = function () {
        return (lg = a._emscripten_bind_b2Body_GetMassData_1 = a.asm.ne).apply(
          null,
          arguments,
        );
      }),
      mg = (a._emscripten_bind_b2Body_SetMassData_1 = function () {
        return (mg = a._emscripten_bind_b2Body_SetMassData_1 = a.asm.oe).apply(
          null,
          arguments,
        );
      }),
      ng = (a._emscripten_bind_b2Body_ResetMassData_0 = function () {
        return (ng = a._emscripten_bind_b2Body_ResetMassData_0 =
          a.asm.pe).apply(null, arguments);
      }),
      og = (a._emscripten_bind_b2Body_GetWorldPoint_1 = function () {
        return (og = a._emscripten_bind_b2Body_GetWorldPoint_1 =
          a.asm.qe).apply(null, arguments);
      }),
      pg = (a._emscripten_bind_b2Body_GetWorldVector_1 = function () {
        return (pg = a._emscripten_bind_b2Body_GetWorldVector_1 =
          a.asm.re).apply(null, arguments);
      }),
      qg = (a._emscripten_bind_b2Body_GetLocalPoint_1 = function () {
        return (qg = a._emscripten_bind_b2Body_GetLocalPoint_1 =
          a.asm.se).apply(null, arguments);
      }),
      rg = (a._emscripten_bind_b2Body_GetLocalVector_1 = function () {
        return (rg = a._emscripten_bind_b2Body_GetLocalVector_1 =
          a.asm.te).apply(null, arguments);
      }),
      sg = (a._emscripten_bind_b2Body_GetLinearVelocityFromWorldPoint_1 =
        function () {
          return (sg =
            a._emscripten_bind_b2Body_GetLinearVelocityFromWorldPoint_1 =
              a.asm.ue).apply(null, arguments);
        }),
      tg = (a._emscripten_bind_b2Body_GetLinearVelocityFromLocalPoint_1 =
        function () {
          return (tg =
            a._emscripten_bind_b2Body_GetLinearVelocityFromLocalPoint_1 =
              a.asm.ve).apply(null, arguments);
        }),
      ug = (a._emscripten_bind_b2Body_GetLinearDamping_0 = function () {
        return (ug = a._emscripten_bind_b2Body_GetLinearDamping_0 =
          a.asm.we).apply(null, arguments);
      }),
      vg = (a._emscripten_bind_b2Body_SetLinearDamping_1 = function () {
        return (vg = a._emscripten_bind_b2Body_SetLinearDamping_1 =
          a.asm.xe).apply(null, arguments);
      }),
      wg = (a._emscripten_bind_b2Body_GetAngularDamping_0 = function () {
        return (wg = a._emscripten_bind_b2Body_GetAngularDamping_0 =
          a.asm.ye).apply(null, arguments);
      }),
      xg = (a._emscripten_bind_b2Body_SetAngularDamping_1 = function () {
        return (xg = a._emscripten_bind_b2Body_SetAngularDamping_1 =
          a.asm.ze).apply(null, arguments);
      }),
      yg = (a._emscripten_bind_b2Body_GetGravityScale_0 = function () {
        return (yg = a._emscripten_bind_b2Body_GetGravityScale_0 =
          a.asm.Ae).apply(null, arguments);
      }),
      zg = (a._emscripten_bind_b2Body_SetGravityScale_1 = function () {
        return (zg = a._emscripten_bind_b2Body_SetGravityScale_1 =
          a.asm.Be).apply(null, arguments);
      }),
      Ag = (a._emscripten_bind_b2Body_SetType_1 = function () {
        return (Ag = a._emscripten_bind_b2Body_SetType_1 = a.asm.Ce).apply(
          null,
          arguments,
        );
      }),
      Bg = (a._emscripten_bind_b2Body_GetType_0 = function () {
        return (Bg = a._emscripten_bind_b2Body_GetType_0 = a.asm.De).apply(
          null,
          arguments,
        );
      }),
      Cg = (a._emscripten_bind_b2Body_SetBullet_1 = function () {
        return (Cg = a._emscripten_bind_b2Body_SetBullet_1 = a.asm.Ee).apply(
          null,
          arguments,
        );
      }),
      Dg = (a._emscripten_bind_b2Body_IsBullet_0 = function () {
        return (Dg = a._emscripten_bind_b2Body_IsBullet_0 = a.asm.Fe).apply(
          null,
          arguments,
        );
      }),
      Eg = (a._emscripten_bind_b2Body_SetSleepingAllowed_1 = function () {
        return (Eg = a._emscripten_bind_b2Body_SetSleepingAllowed_1 =
          a.asm.Ge).apply(null, arguments);
      }),
      Fg = (a._emscripten_bind_b2Body_IsSleepingAllowed_0 = function () {
        return (Fg = a._emscripten_bind_b2Body_IsSleepingAllowed_0 =
          a.asm.He).apply(null, arguments);
      }),
      Gg = (a._emscripten_bind_b2Body_SetAwake_1 = function () {
        return (Gg = a._emscripten_bind_b2Body_SetAwake_1 = a.asm.Ie).apply(
          null,
          arguments,
        );
      }),
      Hg = (a._emscripten_bind_b2Body_IsAwake_0 = function () {
        return (Hg = a._emscripten_bind_b2Body_IsAwake_0 = a.asm.Je).apply(
          null,
          arguments,
        );
      }),
      Ig = (a._emscripten_bind_b2Body_SetEnabled_1 = function () {
        return (Ig = a._emscripten_bind_b2Body_SetEnabled_1 = a.asm.Ke).apply(
          null,
          arguments,
        );
      }),
      Jg = (a._emscripten_bind_b2Body_IsEnabled_0 = function () {
        return (Jg = a._emscripten_bind_b2Body_IsEnabled_0 = a.asm.Le).apply(
          null,
          arguments,
        );
      }),
      Kg = (a._emscripten_bind_b2Body_SetFixedRotation_1 = function () {
        return (Kg = a._emscripten_bind_b2Body_SetFixedRotation_1 =
          a.asm.Me).apply(null, arguments);
      }),
      Lg = (a._emscripten_bind_b2Body_IsFixedRotation_0 = function () {
        return (Lg = a._emscripten_bind_b2Body_IsFixedRotation_0 =
          a.asm.Ne).apply(null, arguments);
      }),
      Mg = (a._emscripten_bind_b2Body_GetFixtureList_0 = function () {
        return (Mg = a._emscripten_bind_b2Body_GetFixtureList_0 =
          a.asm.Oe).apply(null, arguments);
      }),
      Ng = (a._emscripten_bind_b2Body_GetJointList_0 = function () {
        return (Ng = a._emscripten_bind_b2Body_GetJointList_0 = a.asm.Pe).apply(
          null,
          arguments,
        );
      }),
      Og = (a._emscripten_bind_b2Body_GetContactList_0 = function () {
        return (Og = a._emscripten_bind_b2Body_GetContactList_0 =
          a.asm.Qe).apply(null, arguments);
      }),
      Pg = (a._emscripten_bind_b2Body_GetNext_0 = function () {
        return (Pg = a._emscripten_bind_b2Body_GetNext_0 = a.asm.Re).apply(
          null,
          arguments,
        );
      }),
      Qg = (a._emscripten_bind_b2Body_GetUserData_0 = function () {
        return (Qg = a._emscripten_bind_b2Body_GetUserData_0 = a.asm.Se).apply(
          null,
          arguments,
        );
      }),
      Rg = (a._emscripten_bind_b2Body_GetWorld_0 = function () {
        return (Rg = a._emscripten_bind_b2Body_GetWorld_0 = a.asm.Te).apply(
          null,
          arguments,
        );
      }),
      Sg = (a._emscripten_bind_b2Body_Dump_0 = function () {
        return (Sg = a._emscripten_bind_b2Body_Dump_0 = a.asm.Ue).apply(
          null,
          arguments,
        );
      }),
      Tg = (a._emscripten_bind_b2BodyDef_b2BodyDef_0 = function () {
        return (Tg = a._emscripten_bind_b2BodyDef_b2BodyDef_0 = a.asm.Ve).apply(
          null,
          arguments,
        );
      }),
      Ug = (a._emscripten_bind_b2BodyDef_get_type_0 = function () {
        return (Ug = a._emscripten_bind_b2BodyDef_get_type_0 = a.asm.We).apply(
          null,
          arguments,
        );
      }),
      Vg = (a._emscripten_bind_b2BodyDef_set_type_1 = function () {
        return (Vg = a._emscripten_bind_b2BodyDef_set_type_1 = a.asm.Xe).apply(
          null,
          arguments,
        );
      }),
      Wg = (a._emscripten_bind_b2BodyDef_get_position_0 = function () {
        return (Wg = a._emscripten_bind_b2BodyDef_get_position_0 =
          a.asm.Ye).apply(null, arguments);
      }),
      Xg = (a._emscripten_bind_b2BodyDef_set_position_1 = function () {
        return (Xg = a._emscripten_bind_b2BodyDef_set_position_1 =
          a.asm.Ze).apply(null, arguments);
      }),
      Yg = (a._emscripten_bind_b2BodyDef_get_angle_0 = function () {
        return (Yg = a._emscripten_bind_b2BodyDef_get_angle_0 = a.asm._e).apply(
          null,
          arguments,
        );
      }),
      Zg = (a._emscripten_bind_b2BodyDef_set_angle_1 = function () {
        return (Zg = a._emscripten_bind_b2BodyDef_set_angle_1 = a.asm.$e).apply(
          null,
          arguments,
        );
      }),
      $g = (a._emscripten_bind_b2BodyDef_get_linearVelocity_0 = function () {
        return ($g = a._emscripten_bind_b2BodyDef_get_linearVelocity_0 =
          a.asm.af).apply(null, arguments);
      }),
      ah = (a._emscripten_bind_b2BodyDef_set_linearVelocity_1 = function () {
        return (ah = a._emscripten_bind_b2BodyDef_set_linearVelocity_1 =
          a.asm.bf).apply(null, arguments);
      }),
      bh = (a._emscripten_bind_b2BodyDef_get_angularVelocity_0 = function () {
        return (bh = a._emscripten_bind_b2BodyDef_get_angularVelocity_0 =
          a.asm.cf).apply(null, arguments);
      }),
      ch = (a._emscripten_bind_b2BodyDef_set_angularVelocity_1 = function () {
        return (ch = a._emscripten_bind_b2BodyDef_set_angularVelocity_1 =
          a.asm.df).apply(null, arguments);
      }),
      dh = (a._emscripten_bind_b2BodyDef_get_linearDamping_0 = function () {
        return (dh = a._emscripten_bind_b2BodyDef_get_linearDamping_0 =
          a.asm.ef).apply(null, arguments);
      }),
      eh = (a._emscripten_bind_b2BodyDef_set_linearDamping_1 = function () {
        return (eh = a._emscripten_bind_b2BodyDef_set_linearDamping_1 =
          a.asm.ff).apply(null, arguments);
      }),
      fh = (a._emscripten_bind_b2BodyDef_get_angularDamping_0 = function () {
        return (fh = a._emscripten_bind_b2BodyDef_get_angularDamping_0 =
          a.asm.gf).apply(null, arguments);
      }),
      gh = (a._emscripten_bind_b2BodyDef_set_angularDamping_1 = function () {
        return (gh = a._emscripten_bind_b2BodyDef_set_angularDamping_1 =
          a.asm.hf).apply(null, arguments);
      }),
      hh = (a._emscripten_bind_b2BodyDef_get_allowSleep_0 = function () {
        return (hh = a._emscripten_bind_b2BodyDef_get_allowSleep_0 =
          a.asm.jf).apply(null, arguments);
      }),
      ih = (a._emscripten_bind_b2BodyDef_set_allowSleep_1 = function () {
        return (ih = a._emscripten_bind_b2BodyDef_set_allowSleep_1 =
          a.asm.kf).apply(null, arguments);
      }),
      jh = (a._emscripten_bind_b2BodyDef_get_awake_0 = function () {
        return (jh = a._emscripten_bind_b2BodyDef_get_awake_0 = a.asm.lf).apply(
          null,
          arguments,
        );
      }),
      kh = (a._emscripten_bind_b2BodyDef_set_awake_1 = function () {
        return (kh = a._emscripten_bind_b2BodyDef_set_awake_1 = a.asm.mf).apply(
          null,
          arguments,
        );
      }),
      lh = (a._emscripten_bind_b2BodyDef_get_fixedRotation_0 = function () {
        return (lh = a._emscripten_bind_b2BodyDef_get_fixedRotation_0 =
          a.asm.nf).apply(null, arguments);
      }),
      mh = (a._emscripten_bind_b2BodyDef_set_fixedRotation_1 = function () {
        return (mh = a._emscripten_bind_b2BodyDef_set_fixedRotation_1 =
          a.asm.of).apply(null, arguments);
      }),
      nh = (a._emscripten_bind_b2BodyDef_get_bullet_0 = function () {
        return (nh = a._emscripten_bind_b2BodyDef_get_bullet_0 =
          a.asm.pf).apply(null, arguments);
      }),
      oh = (a._emscripten_bind_b2BodyDef_set_bullet_1 = function () {
        return (oh = a._emscripten_bind_b2BodyDef_set_bullet_1 =
          a.asm.qf).apply(null, arguments);
      }),
      ph = (a._emscripten_bind_b2BodyDef_get_userData_0 = function () {
        return (ph = a._emscripten_bind_b2BodyDef_get_userData_0 =
          a.asm.rf).apply(null, arguments);
      }),
      qh = (a._emscripten_bind_b2BodyDef_set_userData_1 = function () {
        return (qh = a._emscripten_bind_b2BodyDef_set_userData_1 =
          a.asm.sf).apply(null, arguments);
      }),
      rh = (a._emscripten_bind_b2BodyDef_get_gravityScale_0 = function () {
        return (rh = a._emscripten_bind_b2BodyDef_get_gravityScale_0 =
          a.asm.tf).apply(null, arguments);
      }),
      sh = (a._emscripten_bind_b2BodyDef_set_gravityScale_1 = function () {
        return (sh = a._emscripten_bind_b2BodyDef_set_gravityScale_1 =
          a.asm.uf).apply(null, arguments);
      }),
      th = (a._emscripten_bind_b2BodyDef___destroy___0 = function () {
        return (th = a._emscripten_bind_b2BodyDef___destroy___0 =
          a.asm.vf).apply(null, arguments);
      }),
      uh = (a._emscripten_bind_b2Filter_b2Filter_0 = function () {
        return (uh = a._emscripten_bind_b2Filter_b2Filter_0 = a.asm.wf).apply(
          null,
          arguments,
        );
      }),
      vh = (a._emscripten_bind_b2Filter_get_categoryBits_0 = function () {
        return (vh = a._emscripten_bind_b2Filter_get_categoryBits_0 =
          a.asm.xf).apply(null, arguments);
      }),
      wh = (a._emscripten_bind_b2Filter_set_categoryBits_1 = function () {
        return (wh = a._emscripten_bind_b2Filter_set_categoryBits_1 =
          a.asm.yf).apply(null, arguments);
      }),
      xh = (a._emscripten_bind_b2Filter_get_maskBits_0 = function () {
        return (xh = a._emscripten_bind_b2Filter_get_maskBits_0 =
          a.asm.zf).apply(null, arguments);
      }),
      yh = (a._emscripten_bind_b2Filter_set_maskBits_1 = function () {
        return (yh = a._emscripten_bind_b2Filter_set_maskBits_1 =
          a.asm.Af).apply(null, arguments);
      }),
      zh = (a._emscripten_bind_b2Filter_get_groupIndex_0 = function () {
        return (zh = a._emscripten_bind_b2Filter_get_groupIndex_0 =
          a.asm.Bf).apply(null, arguments);
      }),
      Ah = (a._emscripten_bind_b2Filter_set_groupIndex_1 = function () {
        return (Ah = a._emscripten_bind_b2Filter_set_groupIndex_1 =
          a.asm.Cf).apply(null, arguments);
      }),
      Bh = (a._emscripten_bind_b2Filter___destroy___0 = function () {
        return (Bh = a._emscripten_bind_b2Filter___destroy___0 =
          a.asm.Df).apply(null, arguments);
      }),
      Ch = (a._emscripten_bind_b2AABB_b2AABB_0 = function () {
        return (Ch = a._emscripten_bind_b2AABB_b2AABB_0 = a.asm.Ef).apply(
          null,
          arguments,
        );
      }),
      Dh = (a._emscripten_bind_b2AABB_IsValid_0 = function () {
        return (Dh = a._emscripten_bind_b2AABB_IsValid_0 = a.asm.Ff).apply(
          null,
          arguments,
        );
      }),
      Eh = (a._emscripten_bind_b2AABB_GetCenter_0 = function () {
        return (Eh = a._emscripten_bind_b2AABB_GetCenter_0 = a.asm.Gf).apply(
          null,
          arguments,
        );
      }),
      Fh = (a._emscripten_bind_b2AABB_GetExtents_0 = function () {
        return (Fh = a._emscripten_bind_b2AABB_GetExtents_0 = a.asm.Hf).apply(
          null,
          arguments,
        );
      }),
      Gh = (a._emscripten_bind_b2AABB_GetPerimeter_0 = function () {
        return (Gh = a._emscripten_bind_b2AABB_GetPerimeter_0 = a.asm.If).apply(
          null,
          arguments,
        );
      }),
      Hh = (a._emscripten_bind_b2AABB_Combine_1 = function () {
        return (Hh = a._emscripten_bind_b2AABB_Combine_1 = a.asm.Jf).apply(
          null,
          arguments,
        );
      }),
      Ih = (a._emscripten_bind_b2AABB_Combine_2 = function () {
        return (Ih = a._emscripten_bind_b2AABB_Combine_2 = a.asm.Kf).apply(
          null,
          arguments,
        );
      }),
      Jh = (a._emscripten_bind_b2AABB_Contains_1 = function () {
        return (Jh = a._emscripten_bind_b2AABB_Contains_1 = a.asm.Lf).apply(
          null,
          arguments,
        );
      }),
      Kh = (a._emscripten_bind_b2AABB_RayCast_2 = function () {
        return (Kh = a._emscripten_bind_b2AABB_RayCast_2 = a.asm.Mf).apply(
          null,
          arguments,
        );
      }),
      Lh = (a._emscripten_bind_b2AABB_get_lowerBound_0 = function () {
        return (Lh = a._emscripten_bind_b2AABB_get_lowerBound_0 =
          a.asm.Nf).apply(null, arguments);
      }),
      Mh = (a._emscripten_bind_b2AABB_set_lowerBound_1 = function () {
        return (Mh = a._emscripten_bind_b2AABB_set_lowerBound_1 =
          a.asm.Of).apply(null, arguments);
      }),
      Nh = (a._emscripten_bind_b2AABB_get_upperBound_0 = function () {
        return (Nh = a._emscripten_bind_b2AABB_get_upperBound_0 =
          a.asm.Pf).apply(null, arguments);
      }),
      Oh = (a._emscripten_bind_b2AABB_set_upperBound_1 = function () {
        return (Oh = a._emscripten_bind_b2AABB_set_upperBound_1 =
          a.asm.Qf).apply(null, arguments);
      }),
      Ph = (a._emscripten_bind_b2AABB___destroy___0 = function () {
        return (Ph = a._emscripten_bind_b2AABB___destroy___0 = a.asm.Rf).apply(
          null,
          arguments,
        );
      }),
      Qh = (a._emscripten_bind_b2CircleShape_b2CircleShape_0 = function () {
        return (Qh = a._emscripten_bind_b2CircleShape_b2CircleShape_0 =
          a.asm.Sf).apply(null, arguments);
      }),
      Rh = (a._emscripten_bind_b2CircleShape_GetType_0 = function () {
        return (Rh = a._emscripten_bind_b2CircleShape_GetType_0 =
          a.asm.Tf).apply(null, arguments);
      }),
      Sh = (a._emscripten_bind_b2CircleShape_GetChildCount_0 = function () {
        return (Sh = a._emscripten_bind_b2CircleShape_GetChildCount_0 =
          a.asm.Uf).apply(null, arguments);
      }),
      Th = (a._emscripten_bind_b2CircleShape_TestPoint_2 = function () {
        return (Th = a._emscripten_bind_b2CircleShape_TestPoint_2 =
          a.asm.Vf).apply(null, arguments);
      }),
      Uh = (a._emscripten_bind_b2CircleShape_RayCast_4 = function () {
        return (Uh = a._emscripten_bind_b2CircleShape_RayCast_4 =
          a.asm.Wf).apply(null, arguments);
      }),
      Vh = (a._emscripten_bind_b2CircleShape_ComputeAABB_3 = function () {
        return (Vh = a._emscripten_bind_b2CircleShape_ComputeAABB_3 =
          a.asm.Xf).apply(null, arguments);
      }),
      Wh = (a._emscripten_bind_b2CircleShape_ComputeMass_2 = function () {
        return (Wh = a._emscripten_bind_b2CircleShape_ComputeMass_2 =
          a.asm.Yf).apply(null, arguments);
      }),
      Xh = (a._emscripten_bind_b2CircleShape_get_m_p_0 = function () {
        return (Xh = a._emscripten_bind_b2CircleShape_get_m_p_0 =
          a.asm.Zf).apply(null, arguments);
      }),
      Yh = (a._emscripten_bind_b2CircleShape_set_m_p_1 = function () {
        return (Yh = a._emscripten_bind_b2CircleShape_set_m_p_1 =
          a.asm._f).apply(null, arguments);
      }),
      Zh = (a._emscripten_bind_b2CircleShape_get_m_type_0 = function () {
        return (Zh = a._emscripten_bind_b2CircleShape_get_m_type_0 =
          a.asm.$f).apply(null, arguments);
      }),
      $h = (a._emscripten_bind_b2CircleShape_set_m_type_1 = function () {
        return ($h = a._emscripten_bind_b2CircleShape_set_m_type_1 =
          a.asm.ag).apply(null, arguments);
      }),
      ai = (a._emscripten_bind_b2CircleShape_get_m_radius_0 = function () {
        return (ai = a._emscripten_bind_b2CircleShape_get_m_radius_0 =
          a.asm.bg).apply(null, arguments);
      }),
      bi = (a._emscripten_bind_b2CircleShape_set_m_radius_1 = function () {
        return (bi = a._emscripten_bind_b2CircleShape_set_m_radius_1 =
          a.asm.cg).apply(null, arguments);
      }),
      ci = (a._emscripten_bind_b2CircleShape___destroy___0 = function () {
        return (ci = a._emscripten_bind_b2CircleShape___destroy___0 =
          a.asm.dg).apply(null, arguments);
      }),
      di = (a._emscripten_bind_b2EdgeShape_b2EdgeShape_0 = function () {
        return (di = a._emscripten_bind_b2EdgeShape_b2EdgeShape_0 =
          a.asm.eg).apply(null, arguments);
      }),
      ei = (a._emscripten_bind_b2EdgeShape_SetOneSided_4 = function () {
        return (ei = a._emscripten_bind_b2EdgeShape_SetOneSided_4 =
          a.asm.fg).apply(null, arguments);
      }),
      fi = (a._emscripten_bind_b2EdgeShape_SetTwoSided_2 = function () {
        return (fi = a._emscripten_bind_b2EdgeShape_SetTwoSided_2 =
          a.asm.gg).apply(null, arguments);
      }),
      gi = (a._emscripten_bind_b2EdgeShape_GetType_0 = function () {
        return (gi = a._emscripten_bind_b2EdgeShape_GetType_0 = a.asm.hg).apply(
          null,
          arguments,
        );
      }),
      hi = (a._emscripten_bind_b2EdgeShape_GetChildCount_0 = function () {
        return (hi = a._emscripten_bind_b2EdgeShape_GetChildCount_0 =
          a.asm.ig).apply(null, arguments);
      }),
      ii = (a._emscripten_bind_b2EdgeShape_TestPoint_2 = function () {
        return (ii = a._emscripten_bind_b2EdgeShape_TestPoint_2 =
          a.asm.jg).apply(null, arguments);
      }),
      ji = (a._emscripten_bind_b2EdgeShape_RayCast_4 = function () {
        return (ji = a._emscripten_bind_b2EdgeShape_RayCast_4 = a.asm.kg).apply(
          null,
          arguments,
        );
      }),
      ki = (a._emscripten_bind_b2EdgeShape_ComputeAABB_3 = function () {
        return (ki = a._emscripten_bind_b2EdgeShape_ComputeAABB_3 =
          a.asm.lg).apply(null, arguments);
      }),
      li = (a._emscripten_bind_b2EdgeShape_ComputeMass_2 = function () {
        return (li = a._emscripten_bind_b2EdgeShape_ComputeMass_2 =
          a.asm.mg).apply(null, arguments);
      }),
      mi = (a._emscripten_bind_b2EdgeShape_get_m_vertex1_0 = function () {
        return (mi = a._emscripten_bind_b2EdgeShape_get_m_vertex1_0 =
          a.asm.ng).apply(null, arguments);
      }),
      ni = (a._emscripten_bind_b2EdgeShape_set_m_vertex1_1 = function () {
        return (ni = a._emscripten_bind_b2EdgeShape_set_m_vertex1_1 =
          a.asm.og).apply(null, arguments);
      }),
      oi = (a._emscripten_bind_b2EdgeShape_get_m_vertex2_0 = function () {
        return (oi = a._emscripten_bind_b2EdgeShape_get_m_vertex2_0 =
          a.asm.pg).apply(null, arguments);
      }),
      pi = (a._emscripten_bind_b2EdgeShape_set_m_vertex2_1 = function () {
        return (pi = a._emscripten_bind_b2EdgeShape_set_m_vertex2_1 =
          a.asm.qg).apply(null, arguments);
      }),
      qi = (a._emscripten_bind_b2EdgeShape_get_m_vertex0_0 = function () {
        return (qi = a._emscripten_bind_b2EdgeShape_get_m_vertex0_0 =
          a.asm.rg).apply(null, arguments);
      }),
      ri = (a._emscripten_bind_b2EdgeShape_set_m_vertex0_1 = function () {
        return (ri = a._emscripten_bind_b2EdgeShape_set_m_vertex0_1 =
          a.asm.sg).apply(null, arguments);
      }),
      si = (a._emscripten_bind_b2EdgeShape_get_m_vertex3_0 = function () {
        return (si = a._emscripten_bind_b2EdgeShape_get_m_vertex3_0 =
          a.asm.tg).apply(null, arguments);
      }),
      ti = (a._emscripten_bind_b2EdgeShape_set_m_vertex3_1 = function () {
        return (ti = a._emscripten_bind_b2EdgeShape_set_m_vertex3_1 =
          a.asm.ug).apply(null, arguments);
      }),
      ui = (a._emscripten_bind_b2EdgeShape_get_m_oneSided_0 = function () {
        return (ui = a._emscripten_bind_b2EdgeShape_get_m_oneSided_0 =
          a.asm.vg).apply(null, arguments);
      }),
      vi = (a._emscripten_bind_b2EdgeShape_set_m_oneSided_1 = function () {
        return (vi = a._emscripten_bind_b2EdgeShape_set_m_oneSided_1 =
          a.asm.wg).apply(null, arguments);
      }),
      wi = (a._emscripten_bind_b2EdgeShape_get_m_type_0 = function () {
        return (wi = a._emscripten_bind_b2EdgeShape_get_m_type_0 =
          a.asm.xg).apply(null, arguments);
      }),
      xi = (a._emscripten_bind_b2EdgeShape_set_m_type_1 = function () {
        return (xi = a._emscripten_bind_b2EdgeShape_set_m_type_1 =
          a.asm.yg).apply(null, arguments);
      }),
      yi = (a._emscripten_bind_b2EdgeShape_get_m_radius_0 = function () {
        return (yi = a._emscripten_bind_b2EdgeShape_get_m_radius_0 =
          a.asm.zg).apply(null, arguments);
      }),
      zi = (a._emscripten_bind_b2EdgeShape_set_m_radius_1 = function () {
        return (zi = a._emscripten_bind_b2EdgeShape_set_m_radius_1 =
          a.asm.Ag).apply(null, arguments);
      }),
      Ai = (a._emscripten_bind_b2EdgeShape___destroy___0 = function () {
        return (Ai = a._emscripten_bind_b2EdgeShape___destroy___0 =
          a.asm.Bg).apply(null, arguments);
      }),
      Bi = (a._emscripten_bind_b2JointUserData_get_pointer_0 = function () {
        return (Bi = a._emscripten_bind_b2JointUserData_get_pointer_0 =
          a.asm.Cg).apply(null, arguments);
      }),
      Ci = (a._emscripten_bind_b2JointUserData_set_pointer_1 = function () {
        return (Ci = a._emscripten_bind_b2JointUserData_set_pointer_1 =
          a.asm.Dg).apply(null, arguments);
      }),
      Di = (a._emscripten_bind_b2JointUserData___destroy___0 = function () {
        return (Di = a._emscripten_bind_b2JointUserData___destroy___0 =
          a.asm.Eg).apply(null, arguments);
      }),
      Ei = (a._emscripten_bind_b2WeldJoint_GetLocalAnchorA_0 = function () {
        return (Ei = a._emscripten_bind_b2WeldJoint_GetLocalAnchorA_0 =
          a.asm.Fg).apply(null, arguments);
      }),
      Fi = (a._emscripten_bind_b2WeldJoint_GetLocalAnchorB_0 = function () {
        return (Fi = a._emscripten_bind_b2WeldJoint_GetLocalAnchorB_0 =
          a.asm.Gg).apply(null, arguments);
      }),
      Gi = (a._emscripten_bind_b2WeldJoint_GetReferenceAngle_0 = function () {
        return (Gi = a._emscripten_bind_b2WeldJoint_GetReferenceAngle_0 =
          a.asm.Hg).apply(null, arguments);
      }),
      Hi = (a._emscripten_bind_b2WeldJoint_SetStiffness_1 = function () {
        return (Hi = a._emscripten_bind_b2WeldJoint_SetStiffness_1 =
          a.asm.Ig).apply(null, arguments);
      }),
      Ii = (a._emscripten_bind_b2WeldJoint_GetStiffness_0 = function () {
        return (Ii = a._emscripten_bind_b2WeldJoint_GetStiffness_0 =
          a.asm.Jg).apply(null, arguments);
      }),
      Ji = (a._emscripten_bind_b2WeldJoint_SetDamping_1 = function () {
        return (Ji = a._emscripten_bind_b2WeldJoint_SetDamping_1 =
          a.asm.Kg).apply(null, arguments);
      }),
      Ki = (a._emscripten_bind_b2WeldJoint_GetDamping_0 = function () {
        return (Ki = a._emscripten_bind_b2WeldJoint_GetDamping_0 =
          a.asm.Lg).apply(null, arguments);
      }),
      Li = (a._emscripten_bind_b2WeldJoint_Dump_0 = function () {
        return (Li = a._emscripten_bind_b2WeldJoint_Dump_0 = a.asm.Mg).apply(
          null,
          arguments,
        );
      }),
      Mi = (a._emscripten_bind_b2WeldJoint_GetType_0 = function () {
        return (Mi = a._emscripten_bind_b2WeldJoint_GetType_0 = a.asm.Ng).apply(
          null,
          arguments,
        );
      }),
      Ni = (a._emscripten_bind_b2WeldJoint_GetBodyA_0 = function () {
        return (Ni = a._emscripten_bind_b2WeldJoint_GetBodyA_0 =
          a.asm.Og).apply(null, arguments);
      }),
      Oi = (a._emscripten_bind_b2WeldJoint_GetBodyB_0 = function () {
        return (Oi = a._emscripten_bind_b2WeldJoint_GetBodyB_0 =
          a.asm.Pg).apply(null, arguments);
      }),
      Pi = (a._emscripten_bind_b2WeldJoint_GetAnchorA_0 = function () {
        return (Pi = a._emscripten_bind_b2WeldJoint_GetAnchorA_0 =
          a.asm.Qg).apply(null, arguments);
      }),
      Qi = (a._emscripten_bind_b2WeldJoint_GetAnchorB_0 = function () {
        return (Qi = a._emscripten_bind_b2WeldJoint_GetAnchorB_0 =
          a.asm.Rg).apply(null, arguments);
      }),
      Ri = (a._emscripten_bind_b2WeldJoint_GetReactionForce_1 = function () {
        return (Ri = a._emscripten_bind_b2WeldJoint_GetReactionForce_1 =
          a.asm.Sg).apply(null, arguments);
      }),
      Si = (a._emscripten_bind_b2WeldJoint_GetReactionTorque_1 = function () {
        return (Si = a._emscripten_bind_b2WeldJoint_GetReactionTorque_1 =
          a.asm.Tg).apply(null, arguments);
      }),
      Ti = (a._emscripten_bind_b2WeldJoint_GetNext_0 = function () {
        return (Ti = a._emscripten_bind_b2WeldJoint_GetNext_0 = a.asm.Ug).apply(
          null,
          arguments,
        );
      }),
      Ui = (a._emscripten_bind_b2WeldJoint_GetUserData_0 = function () {
        return (Ui = a._emscripten_bind_b2WeldJoint_GetUserData_0 =
          a.asm.Vg).apply(null, arguments);
      }),
      Vi = (a._emscripten_bind_b2WeldJoint_GetCollideConnected_0 = function () {
        return (Vi = a._emscripten_bind_b2WeldJoint_GetCollideConnected_0 =
          a.asm.Wg).apply(null, arguments);
      }),
      Wi = (a._emscripten_bind_b2WeldJoint___destroy___0 = function () {
        return (Wi = a._emscripten_bind_b2WeldJoint___destroy___0 =
          a.asm.Xg).apply(null, arguments);
      }),
      Xi = (a._emscripten_bind_b2WeldJointDef_b2WeldJointDef_0 = function () {
        return (Xi = a._emscripten_bind_b2WeldJointDef_b2WeldJointDef_0 =
          a.asm.Yg).apply(null, arguments);
      }),
      Yi = (a._emscripten_bind_b2WeldJointDef_Initialize_3 = function () {
        return (Yi = a._emscripten_bind_b2WeldJointDef_Initialize_3 =
          a.asm.Zg).apply(null, arguments);
      }),
      Zi = (a._emscripten_bind_b2WeldJointDef_get_localAnchorA_0 = function () {
        return (Zi = a._emscripten_bind_b2WeldJointDef_get_localAnchorA_0 =
          a.asm._g).apply(null, arguments);
      }),
      $i = (a._emscripten_bind_b2WeldJointDef_set_localAnchorA_1 = function () {
        return ($i = a._emscripten_bind_b2WeldJointDef_set_localAnchorA_1 =
          a.asm.$g).apply(null, arguments);
      }),
      aj = (a._emscripten_bind_b2WeldJointDef_get_localAnchorB_0 = function () {
        return (aj = a._emscripten_bind_b2WeldJointDef_get_localAnchorB_0 =
          a.asm.ah).apply(null, arguments);
      }),
      bj = (a._emscripten_bind_b2WeldJointDef_set_localAnchorB_1 = function () {
        return (bj = a._emscripten_bind_b2WeldJointDef_set_localAnchorB_1 =
          a.asm.bh).apply(null, arguments);
      }),
      cj = (a._emscripten_bind_b2WeldJointDef_get_referenceAngle_0 =
        function () {
          return (cj = a._emscripten_bind_b2WeldJointDef_get_referenceAngle_0 =
            a.asm.ch).apply(null, arguments);
        }),
      dj = (a._emscripten_bind_b2WeldJointDef_set_referenceAngle_1 =
        function () {
          return (dj = a._emscripten_bind_b2WeldJointDef_set_referenceAngle_1 =
            a.asm.dh).apply(null, arguments);
        }),
      ej = (a._emscripten_bind_b2WeldJointDef_get_stiffness_0 = function () {
        return (ej = a._emscripten_bind_b2WeldJointDef_get_stiffness_0 =
          a.asm.eh).apply(null, arguments);
      }),
      fj = (a._emscripten_bind_b2WeldJointDef_set_stiffness_1 = function () {
        return (fj = a._emscripten_bind_b2WeldJointDef_set_stiffness_1 =
          a.asm.fh).apply(null, arguments);
      }),
      gj = (a._emscripten_bind_b2WeldJointDef_get_damping_0 = function () {
        return (gj = a._emscripten_bind_b2WeldJointDef_get_damping_0 =
          a.asm.gh).apply(null, arguments);
      }),
      hj = (a._emscripten_bind_b2WeldJointDef_set_damping_1 = function () {
        return (hj = a._emscripten_bind_b2WeldJointDef_set_damping_1 =
          a.asm.hh).apply(null, arguments);
      }),
      ij = (a._emscripten_bind_b2WeldJointDef_get_type_0 = function () {
        return (ij = a._emscripten_bind_b2WeldJointDef_get_type_0 =
          a.asm.ih).apply(null, arguments);
      }),
      jj = (a._emscripten_bind_b2WeldJointDef_set_type_1 = function () {
        return (jj = a._emscripten_bind_b2WeldJointDef_set_type_1 =
          a.asm.jh).apply(null, arguments);
      }),
      kj = (a._emscripten_bind_b2WeldJointDef_get_userData_0 = function () {
        return (kj = a._emscripten_bind_b2WeldJointDef_get_userData_0 =
          a.asm.kh).apply(null, arguments);
      }),
      lj = (a._emscripten_bind_b2WeldJointDef_set_userData_1 = function () {
        return (lj = a._emscripten_bind_b2WeldJointDef_set_userData_1 =
          a.asm.lh).apply(null, arguments);
      }),
      mj = (a._emscripten_bind_b2WeldJointDef_get_bodyA_0 = function () {
        return (mj = a._emscripten_bind_b2WeldJointDef_get_bodyA_0 =
          a.asm.mh).apply(null, arguments);
      }),
      nj = (a._emscripten_bind_b2WeldJointDef_set_bodyA_1 = function () {
        return (nj = a._emscripten_bind_b2WeldJointDef_set_bodyA_1 =
          a.asm.nh).apply(null, arguments);
      }),
      oj = (a._emscripten_bind_b2WeldJointDef_get_bodyB_0 = function () {
        return (oj = a._emscripten_bind_b2WeldJointDef_get_bodyB_0 =
          a.asm.oh).apply(null, arguments);
      }),
      pj = (a._emscripten_bind_b2WeldJointDef_set_bodyB_1 = function () {
        return (pj = a._emscripten_bind_b2WeldJointDef_set_bodyB_1 =
          a.asm.ph).apply(null, arguments);
      }),
      qj = (a._emscripten_bind_b2WeldJointDef_get_collideConnected_0 =
        function () {
          return (qj =
            a._emscripten_bind_b2WeldJointDef_get_collideConnected_0 =
              a.asm.qh).apply(null, arguments);
        }),
      rj = (a._emscripten_bind_b2WeldJointDef_set_collideConnected_1 =
        function () {
          return (rj =
            a._emscripten_bind_b2WeldJointDef_set_collideConnected_1 =
              a.asm.rh).apply(null, arguments);
        }),
      sj = (a._emscripten_bind_b2WeldJointDef___destroy___0 = function () {
        return (sj = a._emscripten_bind_b2WeldJointDef___destroy___0 =
          a.asm.sh).apply(null, arguments);
      }),
      tj = (a._emscripten_bind_b2ChainShape_b2ChainShape_0 = function () {
        return (tj = a._emscripten_bind_b2ChainShape_b2ChainShape_0 =
          a.asm.th).apply(null, arguments);
      }),
      uj = (a._emscripten_bind_b2ChainShape_Clear_0 = function () {
        return (uj = a._emscripten_bind_b2ChainShape_Clear_0 = a.asm.uh).apply(
          null,
          arguments,
        );
      }),
      vj = (a._emscripten_bind_b2ChainShape_CreateLoop_2 = function () {
        return (vj = a._emscripten_bind_b2ChainShape_CreateLoop_2 =
          a.asm.vh).apply(null, arguments);
      }),
      wj = (a._emscripten_bind_b2ChainShape_CreateChain_4 = function () {
        return (wj = a._emscripten_bind_b2ChainShape_CreateChain_4 =
          a.asm.wh).apply(null, arguments);
      }),
      xj = (a._emscripten_bind_b2ChainShape_GetChildEdge_2 = function () {
        return (xj = a._emscripten_bind_b2ChainShape_GetChildEdge_2 =
          a.asm.xh).apply(null, arguments);
      }),
      yj = (a._emscripten_bind_b2ChainShape_GetType_0 = function () {
        return (yj = a._emscripten_bind_b2ChainShape_GetType_0 =
          a.asm.yh).apply(null, arguments);
      }),
      zj = (a._emscripten_bind_b2ChainShape_GetChildCount_0 = function () {
        return (zj = a._emscripten_bind_b2ChainShape_GetChildCount_0 =
          a.asm.zh).apply(null, arguments);
      }),
      Aj = (a._emscripten_bind_b2ChainShape_TestPoint_2 = function () {
        return (Aj = a._emscripten_bind_b2ChainShape_TestPoint_2 =
          a.asm.Ah).apply(null, arguments);
      }),
      Bj = (a._emscripten_bind_b2ChainShape_RayCast_4 = function () {
        return (Bj = a._emscripten_bind_b2ChainShape_RayCast_4 =
          a.asm.Bh).apply(null, arguments);
      }),
      Cj = (a._emscripten_bind_b2ChainShape_ComputeAABB_3 = function () {
        return (Cj = a._emscripten_bind_b2ChainShape_ComputeAABB_3 =
          a.asm.Ch).apply(null, arguments);
      }),
      Dj = (a._emscripten_bind_b2ChainShape_ComputeMass_2 = function () {
        return (Dj = a._emscripten_bind_b2ChainShape_ComputeMass_2 =
          a.asm.Dh).apply(null, arguments);
      }),
      Ej = (a._emscripten_bind_b2ChainShape_get_m_vertices_0 = function () {
        return (Ej = a._emscripten_bind_b2ChainShape_get_m_vertices_0 =
          a.asm.Eh).apply(null, arguments);
      }),
      Fj = (a._emscripten_bind_b2ChainShape_set_m_vertices_1 = function () {
        return (Fj = a._emscripten_bind_b2ChainShape_set_m_vertices_1 =
          a.asm.Fh).apply(null, arguments);
      }),
      Gj = (a._emscripten_bind_b2ChainShape_get_m_count_0 = function () {
        return (Gj = a._emscripten_bind_b2ChainShape_get_m_count_0 =
          a.asm.Gh).apply(null, arguments);
      }),
      Hj = (a._emscripten_bind_b2ChainShape_set_m_count_1 = function () {
        return (Hj = a._emscripten_bind_b2ChainShape_set_m_count_1 =
          a.asm.Hh).apply(null, arguments);
      }),
      Ij = (a._emscripten_bind_b2ChainShape_get_m_prevVertex_0 = function () {
        return (Ij = a._emscripten_bind_b2ChainShape_get_m_prevVertex_0 =
          a.asm.Ih).apply(null, arguments);
      }),
      Jj = (a._emscripten_bind_b2ChainShape_set_m_prevVertex_1 = function () {
        return (Jj = a._emscripten_bind_b2ChainShape_set_m_prevVertex_1 =
          a.asm.Jh).apply(null, arguments);
      }),
      Kj = (a._emscripten_bind_b2ChainShape_get_m_nextVertex_0 = function () {
        return (Kj = a._emscripten_bind_b2ChainShape_get_m_nextVertex_0 =
          a.asm.Kh).apply(null, arguments);
      }),
      Lj = (a._emscripten_bind_b2ChainShape_set_m_nextVertex_1 = function () {
        return (Lj = a._emscripten_bind_b2ChainShape_set_m_nextVertex_1 =
          a.asm.Lh).apply(null, arguments);
      }),
      Mj = (a._emscripten_bind_b2ChainShape_get_m_type_0 = function () {
        return (Mj = a._emscripten_bind_b2ChainShape_get_m_type_0 =
          a.asm.Mh).apply(null, arguments);
      }),
      Nj = (a._emscripten_bind_b2ChainShape_set_m_type_1 = function () {
        return (Nj = a._emscripten_bind_b2ChainShape_set_m_type_1 =
          a.asm.Nh).apply(null, arguments);
      }),
      Oj = (a._emscripten_bind_b2ChainShape_get_m_radius_0 = function () {
        return (Oj = a._emscripten_bind_b2ChainShape_get_m_radius_0 =
          a.asm.Oh).apply(null, arguments);
      }),
      Pj = (a._emscripten_bind_b2ChainShape_set_m_radius_1 = function () {
        return (Pj = a._emscripten_bind_b2ChainShape_set_m_radius_1 =
          a.asm.Ph).apply(null, arguments);
      }),
      Qj = (a._emscripten_bind_b2ChainShape___destroy___0 = function () {
        return (Qj = a._emscripten_bind_b2ChainShape___destroy___0 =
          a.asm.Qh).apply(null, arguments);
      }),
      Rj = (a._emscripten_bind_b2Color_b2Color_0 = function () {
        return (Rj = a._emscripten_bind_b2Color_b2Color_0 = a.asm.Rh).apply(
          null,
          arguments,
        );
      }),
      Sj = (a._emscripten_bind_b2Color_b2Color_3 = function () {
        return (Sj = a._emscripten_bind_b2Color_b2Color_3 = a.asm.Sh).apply(
          null,
          arguments,
        );
      }),
      Tj = (a._emscripten_bind_b2Color_Set_3 = function () {
        return (Tj = a._emscripten_bind_b2Color_Set_3 = a.asm.Th).apply(
          null,
          arguments,
        );
      }),
      Uj = (a._emscripten_bind_b2Color_get_r_0 = function () {
        return (Uj = a._emscripten_bind_b2Color_get_r_0 = a.asm.Uh).apply(
          null,
          arguments,
        );
      }),
      Vj = (a._emscripten_bind_b2Color_set_r_1 = function () {
        return (Vj = a._emscripten_bind_b2Color_set_r_1 = a.asm.Vh).apply(
          null,
          arguments,
        );
      }),
      Wj = (a._emscripten_bind_b2Color_get_g_0 = function () {
        return (Wj = a._emscripten_bind_b2Color_get_g_0 = a.asm.Wh).apply(
          null,
          arguments,
        );
      }),
      Xj = (a._emscripten_bind_b2Color_set_g_1 = function () {
        return (Xj = a._emscripten_bind_b2Color_set_g_1 = a.asm.Xh).apply(
          null,
          arguments,
        );
      }),
      Yj = (a._emscripten_bind_b2Color_get_b_0 = function () {
        return (Yj = a._emscripten_bind_b2Color_get_b_0 = a.asm.Yh).apply(
          null,
          arguments,
        );
      }),
      Zj = (a._emscripten_bind_b2Color_set_b_1 = function () {
        return (Zj = a._emscripten_bind_b2Color_set_b_1 = a.asm.Zh).apply(
          null,
          arguments,
        );
      }),
      ak = (a._emscripten_bind_b2Color___destroy___0 = function () {
        return (ak = a._emscripten_bind_b2Color___destroy___0 = a.asm._h).apply(
          null,
          arguments,
        );
      }),
      bk = (a._emscripten_bind_b2ContactEdge_b2ContactEdge_0 = function () {
        return (bk = a._emscripten_bind_b2ContactEdge_b2ContactEdge_0 =
          a.asm.$h).apply(null, arguments);
      }),
      ck = (a._emscripten_bind_b2ContactEdge_get_other_0 = function () {
        return (ck = a._emscripten_bind_b2ContactEdge_get_other_0 =
          a.asm.ai).apply(null, arguments);
      }),
      dk = (a._emscripten_bind_b2ContactEdge_set_other_1 = function () {
        return (dk = a._emscripten_bind_b2ContactEdge_set_other_1 =
          a.asm.bi).apply(null, arguments);
      }),
      ek = (a._emscripten_bind_b2ContactEdge_get_contact_0 = function () {
        return (ek = a._emscripten_bind_b2ContactEdge_get_contact_0 =
          a.asm.ci).apply(null, arguments);
      }),
      fk = (a._emscripten_bind_b2ContactEdge_set_contact_1 = function () {
        return (fk = a._emscripten_bind_b2ContactEdge_set_contact_1 =
          a.asm.di).apply(null, arguments);
      }),
      gk = (a._emscripten_bind_b2ContactEdge_get_prev_0 = function () {
        return (gk = a._emscripten_bind_b2ContactEdge_get_prev_0 =
          a.asm.ei).apply(null, arguments);
      }),
      hk = (a._emscripten_bind_b2ContactEdge_set_prev_1 = function () {
        return (hk = a._emscripten_bind_b2ContactEdge_set_prev_1 =
          a.asm.fi).apply(null, arguments);
      }),
      ik = (a._emscripten_bind_b2ContactEdge_get_next_0 = function () {
        return (ik = a._emscripten_bind_b2ContactEdge_get_next_0 =
          a.asm.gi).apply(null, arguments);
      }),
      jk = (a._emscripten_bind_b2ContactEdge_set_next_1 = function () {
        return (jk = a._emscripten_bind_b2ContactEdge_set_next_1 =
          a.asm.hi).apply(null, arguments);
      }),
      kk = (a._emscripten_bind_b2ContactEdge___destroy___0 = function () {
        return (kk = a._emscripten_bind_b2ContactEdge___destroy___0 =
          a.asm.ii).apply(null, arguments);
      }),
      lk = (a._emscripten_bind_b2ContactFeature_get_indexA_0 = function () {
        return (lk = a._emscripten_bind_b2ContactFeature_get_indexA_0 =
          a.asm.ji).apply(null, arguments);
      }),
      mk = (a._emscripten_bind_b2ContactFeature_set_indexA_1 = function () {
        return (mk = a._emscripten_bind_b2ContactFeature_set_indexA_1 =
          a.asm.ki).apply(null, arguments);
      }),
      nk = (a._emscripten_bind_b2ContactFeature_get_indexB_0 = function () {
        return (nk = a._emscripten_bind_b2ContactFeature_get_indexB_0 =
          a.asm.li).apply(null, arguments);
      }),
      ok = (a._emscripten_bind_b2ContactFeature_set_indexB_1 = function () {
        return (ok = a._emscripten_bind_b2ContactFeature_set_indexB_1 =
          a.asm.mi).apply(null, arguments);
      }),
      pk = (a._emscripten_bind_b2ContactFeature_get_typeA_0 = function () {
        return (pk = a._emscripten_bind_b2ContactFeature_get_typeA_0 =
          a.asm.ni).apply(null, arguments);
      }),
      qk = (a._emscripten_bind_b2ContactFeature_set_typeA_1 = function () {
        return (qk = a._emscripten_bind_b2ContactFeature_set_typeA_1 =
          a.asm.oi).apply(null, arguments);
      }),
      rk = (a._emscripten_bind_b2ContactFeature_get_typeB_0 = function () {
        return (rk = a._emscripten_bind_b2ContactFeature_get_typeB_0 =
          a.asm.pi).apply(null, arguments);
      }),
      sk = (a._emscripten_bind_b2ContactFeature_set_typeB_1 = function () {
        return (sk = a._emscripten_bind_b2ContactFeature_set_typeB_1 =
          a.asm.qi).apply(null, arguments);
      }),
      tk = (a._emscripten_bind_b2ContactFeature___destroy___0 = function () {
        return (tk = a._emscripten_bind_b2ContactFeature___destroy___0 =
          a.asm.ri).apply(null, arguments);
      }),
      uk = (a._emscripten_bind_b2ContactFilter___destroy___0 = function () {
        return (uk = a._emscripten_bind_b2ContactFilter___destroy___0 =
          a.asm.si).apply(null, arguments);
      }),
      vk = (a._emscripten_bind_JSContactFilter_JSContactFilter_0 = function () {
        return (vk = a._emscripten_bind_JSContactFilter_JSContactFilter_0 =
          a.asm.ti).apply(null, arguments);
      }),
      wk = (a._emscripten_bind_JSContactFilter_ShouldCollide_2 = function () {
        return (wk = a._emscripten_bind_JSContactFilter_ShouldCollide_2 =
          a.asm.ui).apply(null, arguments);
      }),
      xk =
        (a._emscripten_bind_JSContactFilter_ShouldCollideFixtureParticleSystemIndex_3 =
          function () {
            return (xk =
              a._emscripten_bind_JSContactFilter_ShouldCollideFixtureParticleSystemIndex_3 =
                a.asm.vi).apply(null, arguments);
          }),
      yk =
        (a._emscripten_bind_JSContactFilter_ShouldCollideParticleSystemIndexIndex_3 =
          function () {
            return (yk =
              a._emscripten_bind_JSContactFilter_ShouldCollideParticleSystemIndexIndex_3 =
                a.asm.wi).apply(null, arguments);
          }),
      zk = (a._emscripten_bind_JSContactFilter___destroy___0 = function () {
        return (zk = a._emscripten_bind_JSContactFilter___destroy___0 =
          a.asm.xi).apply(null, arguments);
      }),
      Ak = (a._emscripten_bind_b2ContactID_get_cf_0 = function () {
        return (Ak = a._emscripten_bind_b2ContactID_get_cf_0 = a.asm.yi).apply(
          null,
          arguments,
        );
      }),
      Bk = (a._emscripten_bind_b2ContactID_set_cf_1 = function () {
        return (Bk = a._emscripten_bind_b2ContactID_set_cf_1 = a.asm.zi).apply(
          null,
          arguments,
        );
      }),
      Ck = (a._emscripten_bind_b2ContactID_get_key_0 = function () {
        return (Ck = a._emscripten_bind_b2ContactID_get_key_0 = a.asm.Ai).apply(
          null,
          arguments,
        );
      }),
      Dk = (a._emscripten_bind_b2ContactID_set_key_1 = function () {
        return (Dk = a._emscripten_bind_b2ContactID_set_key_1 = a.asm.Bi).apply(
          null,
          arguments,
        );
      }),
      Ek = (a._emscripten_bind_b2ContactID___destroy___0 = function () {
        return (Ek = a._emscripten_bind_b2ContactID___destroy___0 =
          a.asm.Ci).apply(null, arguments);
      }),
      Fk = (a._emscripten_bind_b2ContactImpulse_get_normalImpulses_1 =
        function () {
          return (Fk =
            a._emscripten_bind_b2ContactImpulse_get_normalImpulses_1 =
              a.asm.Di).apply(null, arguments);
        }),
      Gk = (a._emscripten_bind_b2ContactImpulse_set_normalImpulses_2 =
        function () {
          return (Gk =
            a._emscripten_bind_b2ContactImpulse_set_normalImpulses_2 =
              a.asm.Ei).apply(null, arguments);
        }),
      Hk = (a._emscripten_bind_b2ContactImpulse_get_tangentImpulses_1 =
        function () {
          return (Hk =
            a._emscripten_bind_b2ContactImpulse_get_tangentImpulses_1 =
              a.asm.Fi).apply(null, arguments);
        }),
      Ik = (a._emscripten_bind_b2ContactImpulse_set_tangentImpulses_2 =
        function () {
          return (Ik =
            a._emscripten_bind_b2ContactImpulse_set_tangentImpulses_2 =
              a.asm.Gi).apply(null, arguments);
        }),
      Jk = (a._emscripten_bind_b2ContactImpulse_get_count_0 = function () {
        return (Jk = a._emscripten_bind_b2ContactImpulse_get_count_0 =
          a.asm.Hi).apply(null, arguments);
      }),
      Kk = (a._emscripten_bind_b2ContactImpulse_set_count_1 = function () {
        return (Kk = a._emscripten_bind_b2ContactImpulse_set_count_1 =
          a.asm.Ii).apply(null, arguments);
      }),
      Lk = (a._emscripten_bind_b2ContactImpulse___destroy___0 = function () {
        return (Lk = a._emscripten_bind_b2ContactImpulse___destroy___0 =
          a.asm.Ji).apply(null, arguments);
      }),
      Mk = (a._emscripten_bind_b2DestructionListener___destroy___0 =
        function () {
          return (Mk = a._emscripten_bind_b2DestructionListener___destroy___0 =
            a.asm.Ki).apply(null, arguments);
        }),
      Nk = (a._emscripten_bind_JSDestructionListener_JSDestructionListener_0 =
        function () {
          return (Nk =
            a._emscripten_bind_JSDestructionListener_JSDestructionListener_0 =
              a.asm.Li).apply(null, arguments);
        }),
      Ok = (a._emscripten_bind_JSDestructionListener_SayGoodbyeJoint_1 =
        function () {
          return (Ok =
            a._emscripten_bind_JSDestructionListener_SayGoodbyeJoint_1 =
              a.asm.Mi).apply(null, arguments);
        }),
      Pk = (a._emscripten_bind_JSDestructionListener_SayGoodbyeFixture_1 =
        function () {
          return (Pk =
            a._emscripten_bind_JSDestructionListener_SayGoodbyeFixture_1 =
              a.asm.Ni).apply(null, arguments);
        }),
      Qk = (a._emscripten_bind_JSDestructionListener_SayGoodbyeParticleGroup_1 =
        function () {
          return (Qk =
            a._emscripten_bind_JSDestructionListener_SayGoodbyeParticleGroup_1 =
              a.asm.Oi).apply(null, arguments);
        }),
      Rk =
        (a._emscripten_bind_JSDestructionListener_SayGoodbyeParticleSystemIndex_2 =
          function () {
            return (Rk =
              a._emscripten_bind_JSDestructionListener_SayGoodbyeParticleSystemIndex_2 =
                a.asm.Pi).apply(null, arguments);
          }),
      Sk = (a._emscripten_bind_JSDestructionListener___destroy___0 =
        function () {
          return (Sk = a._emscripten_bind_JSDestructionListener___destroy___0 =
            a.asm.Qi).apply(null, arguments);
        }),
      Tk = (a._emscripten_bind_b2DistanceJoint_GetLocalAnchorA_0 = function () {
        return (Tk = a._emscripten_bind_b2DistanceJoint_GetLocalAnchorA_0 =
          a.asm.Ri).apply(null, arguments);
      }),
      Uk = (a._emscripten_bind_b2DistanceJoint_GetLocalAnchorB_0 = function () {
        return (Uk = a._emscripten_bind_b2DistanceJoint_GetLocalAnchorB_0 =
          a.asm.Si).apply(null, arguments);
      }),
      Vk = (a._emscripten_bind_b2DistanceJoint_GetLength_0 = function () {
        return (Vk = a._emscripten_bind_b2DistanceJoint_GetLength_0 =
          a.asm.Ti).apply(null, arguments);
      }),
      Wk = (a._emscripten_bind_b2DistanceJoint_SetLength_1 = function () {
        return (Wk = a._emscripten_bind_b2DistanceJoint_SetLength_1 =
          a.asm.Ui).apply(null, arguments);
      }),
      Xk = (a._emscripten_bind_b2DistanceJoint_GetMinLength_0 = function () {
        return (Xk = a._emscripten_bind_b2DistanceJoint_GetMinLength_0 =
          a.asm.Vi).apply(null, arguments);
      }),
      Yk = (a._emscripten_bind_b2DistanceJoint_SetMinLength_1 = function () {
        return (Yk = a._emscripten_bind_b2DistanceJoint_SetMinLength_1 =
          a.asm.Wi).apply(null, arguments);
      }),
      Zk = (a._emscripten_bind_b2DistanceJoint_GetMaxLength_0 = function () {
        return (Zk = a._emscripten_bind_b2DistanceJoint_GetMaxLength_0 =
          a.asm.Xi).apply(null, arguments);
      }),
      $k = (a._emscripten_bind_b2DistanceJoint_SetMaxLength_1 = function () {
        return ($k = a._emscripten_bind_b2DistanceJoint_SetMaxLength_1 =
          a.asm.Yi).apply(null, arguments);
      }),
      al = (a._emscripten_bind_b2DistanceJoint_GetCurrentLength_0 =
        function () {
          return (al = a._emscripten_bind_b2DistanceJoint_GetCurrentLength_0 =
            a.asm.Zi).apply(null, arguments);
        }),
      bl = (a._emscripten_bind_b2DistanceJoint_SetStiffness_1 = function () {
        return (bl = a._emscripten_bind_b2DistanceJoint_SetStiffness_1 =
          a.asm._i).apply(null, arguments);
      }),
      cl = (a._emscripten_bind_b2DistanceJoint_GetStiffness_0 = function () {
        return (cl = a._emscripten_bind_b2DistanceJoint_GetStiffness_0 =
          a.asm.$i).apply(null, arguments);
      }),
      dl = (a._emscripten_bind_b2DistanceJoint_SetDamping_1 = function () {
        return (dl = a._emscripten_bind_b2DistanceJoint_SetDamping_1 =
          a.asm.aj).apply(null, arguments);
      }),
      el = (a._emscripten_bind_b2DistanceJoint_GetDamping_0 = function () {
        return (el = a._emscripten_bind_b2DistanceJoint_GetDamping_0 =
          a.asm.bj).apply(null, arguments);
      }),
      fl = (a._emscripten_bind_b2DistanceJoint_GetType_0 = function () {
        return (fl = a._emscripten_bind_b2DistanceJoint_GetType_0 =
          a.asm.cj).apply(null, arguments);
      }),
      gl = (a._emscripten_bind_b2DistanceJoint_GetBodyA_0 = function () {
        return (gl = a._emscripten_bind_b2DistanceJoint_GetBodyA_0 =
          a.asm.dj).apply(null, arguments);
      }),
      hl = (a._emscripten_bind_b2DistanceJoint_GetBodyB_0 = function () {
        return (hl = a._emscripten_bind_b2DistanceJoint_GetBodyB_0 =
          a.asm.ej).apply(null, arguments);
      }),
      il = (a._emscripten_bind_b2DistanceJoint_GetAnchorA_0 = function () {
        return (il = a._emscripten_bind_b2DistanceJoint_GetAnchorA_0 =
          a.asm.fj).apply(null, arguments);
      }),
      jl = (a._emscripten_bind_b2DistanceJoint_GetAnchorB_0 = function () {
        return (jl = a._emscripten_bind_b2DistanceJoint_GetAnchorB_0 =
          a.asm.gj).apply(null, arguments);
      }),
      kl = (a._emscripten_bind_b2DistanceJoint_GetReactionForce_1 =
        function () {
          return (kl = a._emscripten_bind_b2DistanceJoint_GetReactionForce_1 =
            a.asm.hj).apply(null, arguments);
        }),
      ll = (a._emscripten_bind_b2DistanceJoint_GetReactionTorque_1 =
        function () {
          return (ll = a._emscripten_bind_b2DistanceJoint_GetReactionTorque_1 =
            a.asm.ij).apply(null, arguments);
        }),
      ml = (a._emscripten_bind_b2DistanceJoint_GetNext_0 = function () {
        return (ml = a._emscripten_bind_b2DistanceJoint_GetNext_0 =
          a.asm.jj).apply(null, arguments);
      }),
      nl = (a._emscripten_bind_b2DistanceJoint_GetUserData_0 = function () {
        return (nl = a._emscripten_bind_b2DistanceJoint_GetUserData_0 =
          a.asm.kj).apply(null, arguments);
      }),
      ol = (a._emscripten_bind_b2DistanceJoint_GetCollideConnected_0 =
        function () {
          return (ol =
            a._emscripten_bind_b2DistanceJoint_GetCollideConnected_0 =
              a.asm.lj).apply(null, arguments);
        }),
      pl = (a._emscripten_bind_b2DistanceJoint___destroy___0 = function () {
        return (pl = a._emscripten_bind_b2DistanceJoint___destroy___0 =
          a.asm.mj).apply(null, arguments);
      }),
      ql = (a._emscripten_bind_b2DistanceJointDef_b2DistanceJointDef_0 =
        function () {
          return (ql =
            a._emscripten_bind_b2DistanceJointDef_b2DistanceJointDef_0 =
              a.asm.nj).apply(null, arguments);
        }),
      rl = (a._emscripten_bind_b2DistanceJointDef_Initialize_4 = function () {
        return (rl = a._emscripten_bind_b2DistanceJointDef_Initialize_4 =
          a.asm.oj).apply(null, arguments);
      }),
      sl = (a._emscripten_bind_b2DistanceJointDef_get_localAnchorA_0 =
        function () {
          return (sl =
            a._emscripten_bind_b2DistanceJointDef_get_localAnchorA_0 =
              a.asm.pj).apply(null, arguments);
        }),
      tl = (a._emscripten_bind_b2DistanceJointDef_set_localAnchorA_1 =
        function () {
          return (tl =
            a._emscripten_bind_b2DistanceJointDef_set_localAnchorA_1 =
              a.asm.qj).apply(null, arguments);
        }),
      ul = (a._emscripten_bind_b2DistanceJointDef_get_localAnchorB_0 =
        function () {
          return (ul =
            a._emscripten_bind_b2DistanceJointDef_get_localAnchorB_0 =
              a.asm.rj).apply(null, arguments);
        }),
      vl = (a._emscripten_bind_b2DistanceJointDef_set_localAnchorB_1 =
        function () {
          return (vl =
            a._emscripten_bind_b2DistanceJointDef_set_localAnchorB_1 =
              a.asm.sj).apply(null, arguments);
        }),
      wl = (a._emscripten_bind_b2DistanceJointDef_get_length_0 = function () {
        return (wl = a._emscripten_bind_b2DistanceJointDef_get_length_0 =
          a.asm.tj).apply(null, arguments);
      }),
      xl = (a._emscripten_bind_b2DistanceJointDef_set_length_1 = function () {
        return (xl = a._emscripten_bind_b2DistanceJointDef_set_length_1 =
          a.asm.uj).apply(null, arguments);
      }),
      yl = (a._emscripten_bind_b2DistanceJointDef_get_minLength_0 =
        function () {
          return (yl = a._emscripten_bind_b2DistanceJointDef_get_minLength_0 =
            a.asm.vj).apply(null, arguments);
        }),
      zl = (a._emscripten_bind_b2DistanceJointDef_set_minLength_1 =
        function () {
          return (zl = a._emscripten_bind_b2DistanceJointDef_set_minLength_1 =
            a.asm.wj).apply(null, arguments);
        }),
      Al = (a._emscripten_bind_b2DistanceJointDef_get_maxLength_0 =
        function () {
          return (Al = a._emscripten_bind_b2DistanceJointDef_get_maxLength_0 =
            a.asm.xj).apply(null, arguments);
        }),
      Bl = (a._emscripten_bind_b2DistanceJointDef_set_maxLength_1 =
        function () {
          return (Bl = a._emscripten_bind_b2DistanceJointDef_set_maxLength_1 =
            a.asm.yj).apply(null, arguments);
        }),
      Cl = (a._emscripten_bind_b2DistanceJointDef_get_stiffness_0 =
        function () {
          return (Cl = a._emscripten_bind_b2DistanceJointDef_get_stiffness_0 =
            a.asm.zj).apply(null, arguments);
        }),
      Dl = (a._emscripten_bind_b2DistanceJointDef_set_stiffness_1 =
        function () {
          return (Dl = a._emscripten_bind_b2DistanceJointDef_set_stiffness_1 =
            a.asm.Aj).apply(null, arguments);
        }),
      El = (a._emscripten_bind_b2DistanceJointDef_get_damping_0 = function () {
        return (El = a._emscripten_bind_b2DistanceJointDef_get_damping_0 =
          a.asm.Bj).apply(null, arguments);
      }),
      Fl = (a._emscripten_bind_b2DistanceJointDef_set_damping_1 = function () {
        return (Fl = a._emscripten_bind_b2DistanceJointDef_set_damping_1 =
          a.asm.Cj).apply(null, arguments);
      }),
      Gl = (a._emscripten_bind_b2DistanceJointDef_get_type_0 = function () {
        return (Gl = a._emscripten_bind_b2DistanceJointDef_get_type_0 =
          a.asm.Dj).apply(null, arguments);
      }),
      Hl = (a._emscripten_bind_b2DistanceJointDef_set_type_1 = function () {
        return (Hl = a._emscripten_bind_b2DistanceJointDef_set_type_1 =
          a.asm.Ej).apply(null, arguments);
      }),
      Il = (a._emscripten_bind_b2DistanceJointDef_get_userData_0 = function () {
        return (Il = a._emscripten_bind_b2DistanceJointDef_get_userData_0 =
          a.asm.Fj).apply(null, arguments);
      }),
      Jl = (a._emscripten_bind_b2DistanceJointDef_set_userData_1 = function () {
        return (Jl = a._emscripten_bind_b2DistanceJointDef_set_userData_1 =
          a.asm.Gj).apply(null, arguments);
      }),
      Kl = (a._emscripten_bind_b2DistanceJointDef_get_bodyA_0 = function () {
        return (Kl = a._emscripten_bind_b2DistanceJointDef_get_bodyA_0 =
          a.asm.Hj).apply(null, arguments);
      }),
      Ll = (a._emscripten_bind_b2DistanceJointDef_set_bodyA_1 = function () {
        return (Ll = a._emscripten_bind_b2DistanceJointDef_set_bodyA_1 =
          a.asm.Ij).apply(null, arguments);
      }),
      Ml = (a._emscripten_bind_b2DistanceJointDef_get_bodyB_0 = function () {
        return (Ml = a._emscripten_bind_b2DistanceJointDef_get_bodyB_0 =
          a.asm.Jj).apply(null, arguments);
      }),
      Nl = (a._emscripten_bind_b2DistanceJointDef_set_bodyB_1 = function () {
        return (Nl = a._emscripten_bind_b2DistanceJointDef_set_bodyB_1 =
          a.asm.Kj).apply(null, arguments);
      }),
      Ol = (a._emscripten_bind_b2DistanceJointDef_get_collideConnected_0 =
        function () {
          return (Ol =
            a._emscripten_bind_b2DistanceJointDef_get_collideConnected_0 =
              a.asm.Lj).apply(null, arguments);
        }),
      Pl = (a._emscripten_bind_b2DistanceJointDef_set_collideConnected_1 =
        function () {
          return (Pl =
            a._emscripten_bind_b2DistanceJointDef_set_collideConnected_1 =
              a.asm.Mj).apply(null, arguments);
        }),
      Ql = (a._emscripten_bind_b2DistanceJointDef___destroy___0 = function () {
        return (Ql = a._emscripten_bind_b2DistanceJointDef___destroy___0 =
          a.asm.Nj).apply(null, arguments);
      }),
      Rl = (a._emscripten_bind_JSDraw_JSDraw_0 = function () {
        return (Rl = a._emscripten_bind_JSDraw_JSDraw_0 = a.asm.Oj).apply(
          null,
          arguments,
        );
      }),
      Sl = (a._emscripten_bind_JSDraw_DrawPolygon_3 = function () {
        return (Sl = a._emscripten_bind_JSDraw_DrawPolygon_3 = a.asm.Pj).apply(
          null,
          arguments,
        );
      }),
      Tl = (a._emscripten_bind_JSDraw_DrawSolidPolygon_3 = function () {
        return (Tl = a._emscripten_bind_JSDraw_DrawSolidPolygon_3 =
          a.asm.Qj).apply(null, arguments);
      }),
      Ul = (a._emscripten_bind_JSDraw_DrawCircle_3 = function () {
        return (Ul = a._emscripten_bind_JSDraw_DrawCircle_3 = a.asm.Rj).apply(
          null,
          arguments,
        );
      }),
      Vl = (a._emscripten_bind_JSDraw_DrawSolidCircle_4 = function () {
        return (Vl = a._emscripten_bind_JSDraw_DrawSolidCircle_4 =
          a.asm.Sj).apply(null, arguments);
      }),
      Wl = (a._emscripten_bind_JSDraw_DrawParticles_4 = function () {
        return (Wl = a._emscripten_bind_JSDraw_DrawParticles_4 =
          a.asm.Tj).apply(null, arguments);
      }),
      Xl = (a._emscripten_bind_JSDraw_DrawSegment_3 = function () {
        return (Xl = a._emscripten_bind_JSDraw_DrawSegment_3 = a.asm.Uj).apply(
          null,
          arguments,
        );
      }),
      Yl = (a._emscripten_bind_JSDraw_DrawTransform_1 = function () {
        return (Yl = a._emscripten_bind_JSDraw_DrawTransform_1 =
          a.asm.Vj).apply(null, arguments);
      }),
      Zl = (a._emscripten_bind_JSDraw_DrawPoint_3 = function () {
        return (Zl = a._emscripten_bind_JSDraw_DrawPoint_3 = a.asm.Wj).apply(
          null,
          arguments,
        );
      }),
      $l = (a._emscripten_bind_JSDraw___destroy___0 = function () {
        return ($l = a._emscripten_bind_JSDraw___destroy___0 = a.asm.Xj).apply(
          null,
          arguments,
        );
      }),
      am = (a._emscripten_bind_b2FrictionJoint_GetLocalAnchorA_0 = function () {
        return (am = a._emscripten_bind_b2FrictionJoint_GetLocalAnchorA_0 =
          a.asm.Yj).apply(null, arguments);
      }),
      bm = (a._emscripten_bind_b2FrictionJoint_GetLocalAnchorB_0 = function () {
        return (bm = a._emscripten_bind_b2FrictionJoint_GetLocalAnchorB_0 =
          a.asm.Zj).apply(null, arguments);
      }),
      cm = (a._emscripten_bind_b2FrictionJoint_SetMaxForce_1 = function () {
        return (cm = a._emscripten_bind_b2FrictionJoint_SetMaxForce_1 =
          a.asm._j).apply(null, arguments);
      }),
      dm = (a._emscripten_bind_b2FrictionJoint_GetMaxForce_0 = function () {
        return (dm = a._emscripten_bind_b2FrictionJoint_GetMaxForce_0 =
          a.asm.$j).apply(null, arguments);
      }),
      em = (a._emscripten_bind_b2FrictionJoint_SetMaxTorque_1 = function () {
        return (em = a._emscripten_bind_b2FrictionJoint_SetMaxTorque_1 =
          a.asm.ak).apply(null, arguments);
      }),
      fm = (a._emscripten_bind_b2FrictionJoint_GetMaxTorque_0 = function () {
        return (fm = a._emscripten_bind_b2FrictionJoint_GetMaxTorque_0 =
          a.asm.bk).apply(null, arguments);
      }),
      gm = (a._emscripten_bind_b2FrictionJoint_GetType_0 = function () {
        return (gm = a._emscripten_bind_b2FrictionJoint_GetType_0 =
          a.asm.ck).apply(null, arguments);
      }),
      hm = (a._emscripten_bind_b2FrictionJoint_GetBodyA_0 = function () {
        return (hm = a._emscripten_bind_b2FrictionJoint_GetBodyA_0 =
          a.asm.dk).apply(null, arguments);
      }),
      im = (a._emscripten_bind_b2FrictionJoint_GetBodyB_0 = function () {
        return (im = a._emscripten_bind_b2FrictionJoint_GetBodyB_0 =
          a.asm.ek).apply(null, arguments);
      }),
      jm = (a._emscripten_bind_b2FrictionJoint_GetAnchorA_0 = function () {
        return (jm = a._emscripten_bind_b2FrictionJoint_GetAnchorA_0 =
          a.asm.fk).apply(null, arguments);
      }),
      km = (a._emscripten_bind_b2FrictionJoint_GetAnchorB_0 = function () {
        return (km = a._emscripten_bind_b2FrictionJoint_GetAnchorB_0 =
          a.asm.gk).apply(null, arguments);
      }),
      lm = (a._emscripten_bind_b2FrictionJoint_GetReactionForce_1 =
        function () {
          return (lm = a._emscripten_bind_b2FrictionJoint_GetReactionForce_1 =
            a.asm.hk).apply(null, arguments);
        }),
      mm = (a._emscripten_bind_b2FrictionJoint_GetReactionTorque_1 =
        function () {
          return (mm = a._emscripten_bind_b2FrictionJoint_GetReactionTorque_1 =
            a.asm.ik).apply(null, arguments);
        }),
      nm = (a._emscripten_bind_b2FrictionJoint_GetNext_0 = function () {
        return (nm = a._emscripten_bind_b2FrictionJoint_GetNext_0 =
          a.asm.jk).apply(null, arguments);
      }),
      om = (a._emscripten_bind_b2FrictionJoint_GetUserData_0 = function () {
        return (om = a._emscripten_bind_b2FrictionJoint_GetUserData_0 =
          a.asm.kk).apply(null, arguments);
      }),
      pm = (a._emscripten_bind_b2FrictionJoint_GetCollideConnected_0 =
        function () {
          return (pm =
            a._emscripten_bind_b2FrictionJoint_GetCollideConnected_0 =
              a.asm.lk).apply(null, arguments);
        }),
      qm = (a._emscripten_bind_b2FrictionJoint___destroy___0 = function () {
        return (qm = a._emscripten_bind_b2FrictionJoint___destroy___0 =
          a.asm.mk).apply(null, arguments);
      }),
      rm = (a._emscripten_bind_b2FrictionJointDef_b2FrictionJointDef_0 =
        function () {
          return (rm =
            a._emscripten_bind_b2FrictionJointDef_b2FrictionJointDef_0 =
              a.asm.nk).apply(null, arguments);
        }),
      sm = (a._emscripten_bind_b2FrictionJointDef_Initialize_3 = function () {
        return (sm = a._emscripten_bind_b2FrictionJointDef_Initialize_3 =
          a.asm.ok).apply(null, arguments);
      }),
      tm = (a._emscripten_bind_b2FrictionJointDef_get_localAnchorA_0 =
        function () {
          return (tm =
            a._emscripten_bind_b2FrictionJointDef_get_localAnchorA_0 =
              a.asm.pk).apply(null, arguments);
        }),
      um = (a._emscripten_bind_b2FrictionJointDef_set_localAnchorA_1 =
        function () {
          return (um =
            a._emscripten_bind_b2FrictionJointDef_set_localAnchorA_1 =
              a.asm.qk).apply(null, arguments);
        }),
      wm = (a._emscripten_bind_b2FrictionJointDef_get_localAnchorB_0 =
        function () {
          return (wm =
            a._emscripten_bind_b2FrictionJointDef_get_localAnchorB_0 =
              a.asm.rk).apply(null, arguments);
        }),
      xm = (a._emscripten_bind_b2FrictionJointDef_set_localAnchorB_1 =
        function () {
          return (xm =
            a._emscripten_bind_b2FrictionJointDef_set_localAnchorB_1 =
              a.asm.sk).apply(null, arguments);
        }),
      ym = (a._emscripten_bind_b2FrictionJointDef_get_maxForce_0 = function () {
        return (ym = a._emscripten_bind_b2FrictionJointDef_get_maxForce_0 =
          a.asm.tk).apply(null, arguments);
      }),
      zm = (a._emscripten_bind_b2FrictionJointDef_set_maxForce_1 = function () {
        return (zm = a._emscripten_bind_b2FrictionJointDef_set_maxForce_1 =
          a.asm.uk).apply(null, arguments);
      }),
      Am = (a._emscripten_bind_b2FrictionJointDef_get_maxTorque_0 =
        function () {
          return (Am = a._emscripten_bind_b2FrictionJointDef_get_maxTorque_0 =
            a.asm.vk).apply(null, arguments);
        }),
      Bm = (a._emscripten_bind_b2FrictionJointDef_set_maxTorque_1 =
        function () {
          return (Bm = a._emscripten_bind_b2FrictionJointDef_set_maxTorque_1 =
            a.asm.wk).apply(null, arguments);
        }),
      Cm = (a._emscripten_bind_b2FrictionJointDef_get_type_0 = function () {
        return (Cm = a._emscripten_bind_b2FrictionJointDef_get_type_0 =
          a.asm.xk).apply(null, arguments);
      }),
      Dm = (a._emscripten_bind_b2FrictionJointDef_set_type_1 = function () {
        return (Dm = a._emscripten_bind_b2FrictionJointDef_set_type_1 =
          a.asm.yk).apply(null, arguments);
      }),
      Em = (a._emscripten_bind_b2FrictionJointDef_get_userData_0 = function () {
        return (Em = a._emscripten_bind_b2FrictionJointDef_get_userData_0 =
          a.asm.zk).apply(null, arguments);
      }),
      Fm = (a._emscripten_bind_b2FrictionJointDef_set_userData_1 = function () {
        return (Fm = a._emscripten_bind_b2FrictionJointDef_set_userData_1 =
          a.asm.Ak).apply(null, arguments);
      }),
      Gm = (a._emscripten_bind_b2FrictionJointDef_get_bodyA_0 = function () {
        return (Gm = a._emscripten_bind_b2FrictionJointDef_get_bodyA_0 =
          a.asm.Bk).apply(null, arguments);
      }),
      Hm = (a._emscripten_bind_b2FrictionJointDef_set_bodyA_1 = function () {
        return (Hm = a._emscripten_bind_b2FrictionJointDef_set_bodyA_1 =
          a.asm.Ck).apply(null, arguments);
      }),
      Im = (a._emscripten_bind_b2FrictionJointDef_get_bodyB_0 = function () {
        return (Im = a._emscripten_bind_b2FrictionJointDef_get_bodyB_0 =
          a.asm.Dk).apply(null, arguments);
      }),
      Jm = (a._emscripten_bind_b2FrictionJointDef_set_bodyB_1 = function () {
        return (Jm = a._emscripten_bind_b2FrictionJointDef_set_bodyB_1 =
          a.asm.Ek).apply(null, arguments);
      }),
      Km = (a._emscripten_bind_b2FrictionJointDef_get_collideConnected_0 =
        function () {
          return (Km =
            a._emscripten_bind_b2FrictionJointDef_get_collideConnected_0 =
              a.asm.Fk).apply(null, arguments);
        }),
      Lm = (a._emscripten_bind_b2FrictionJointDef_set_collideConnected_1 =
        function () {
          return (Lm =
            a._emscripten_bind_b2FrictionJointDef_set_collideConnected_1 =
              a.asm.Gk).apply(null, arguments);
        }),
      Mm = (a._emscripten_bind_b2FrictionJointDef___destroy___0 = function () {
        return (Mm = a._emscripten_bind_b2FrictionJointDef___destroy___0 =
          a.asm.Hk).apply(null, arguments);
      }),
      Nm = (a._emscripten_bind_b2GearJoint_GetJoint1_0 = function () {
        return (Nm = a._emscripten_bind_b2GearJoint_GetJoint1_0 =
          a.asm.Ik).apply(null, arguments);
      }),
      Om = (a._emscripten_bind_b2GearJoint_GetJoint2_0 = function () {
        return (Om = a._emscripten_bind_b2GearJoint_GetJoint2_0 =
          a.asm.Jk).apply(null, arguments);
      }),
      Pm = (a._emscripten_bind_b2GearJoint_SetRatio_1 = function () {
        return (Pm = a._emscripten_bind_b2GearJoint_SetRatio_1 =
          a.asm.Kk).apply(null, arguments);
      }),
      Qm = (a._emscripten_bind_b2GearJoint_GetRatio_0 = function () {
        return (Qm = a._emscripten_bind_b2GearJoint_GetRatio_0 =
          a.asm.Lk).apply(null, arguments);
      }),
      Rm = (a._emscripten_bind_b2GearJoint_GetType_0 = function () {
        return (Rm = a._emscripten_bind_b2GearJoint_GetType_0 = a.asm.Mk).apply(
          null,
          arguments,
        );
      }),
      Sm = (a._emscripten_bind_b2GearJoint_GetBodyA_0 = function () {
        return (Sm = a._emscripten_bind_b2GearJoint_GetBodyA_0 =
          a.asm.Nk).apply(null, arguments);
      }),
      Tm = (a._emscripten_bind_b2GearJoint_GetBodyB_0 = function () {
        return (Tm = a._emscripten_bind_b2GearJoint_GetBodyB_0 =
          a.asm.Ok).apply(null, arguments);
      }),
      Um = (a._emscripten_bind_b2GearJoint_GetAnchorA_0 = function () {
        return (Um = a._emscripten_bind_b2GearJoint_GetAnchorA_0 =
          a.asm.Pk).apply(null, arguments);
      }),
      Vm = (a._emscripten_bind_b2GearJoint_GetAnchorB_0 = function () {
        return (Vm = a._emscripten_bind_b2GearJoint_GetAnchorB_0 =
          a.asm.Qk).apply(null, arguments);
      }),
      Wm = (a._emscripten_bind_b2GearJoint_GetReactionForce_1 = function () {
        return (Wm = a._emscripten_bind_b2GearJoint_GetReactionForce_1 =
          a.asm.Rk).apply(null, arguments);
      }),
      Xm = (a._emscripten_bind_b2GearJoint_GetReactionTorque_1 = function () {
        return (Xm = a._emscripten_bind_b2GearJoint_GetReactionTorque_1 =
          a.asm.Sk).apply(null, arguments);
      }),
      Ym = (a._emscripten_bind_b2GearJoint_GetNext_0 = function () {
        return (Ym = a._emscripten_bind_b2GearJoint_GetNext_0 = a.asm.Tk).apply(
          null,
          arguments,
        );
      }),
      Zm = (a._emscripten_bind_b2GearJoint_GetUserData_0 = function () {
        return (Zm = a._emscripten_bind_b2GearJoint_GetUserData_0 =
          a.asm.Uk).apply(null, arguments);
      }),
      $m = (a._emscripten_bind_b2GearJoint_GetCollideConnected_0 = function () {
        return ($m = a._emscripten_bind_b2GearJoint_GetCollideConnected_0 =
          a.asm.Vk).apply(null, arguments);
      }),
      an = (a._emscripten_bind_b2GearJoint___destroy___0 = function () {
        return (an = a._emscripten_bind_b2GearJoint___destroy___0 =
          a.asm.Wk).apply(null, arguments);
      }),
      bn = (a._emscripten_bind_b2GearJointDef_b2GearJointDef_0 = function () {
        return (bn = a._emscripten_bind_b2GearJointDef_b2GearJointDef_0 =
          a.asm.Xk).apply(null, arguments);
      }),
      cn = (a._emscripten_bind_b2GearJointDef_get_joint1_0 = function () {
        return (cn = a._emscripten_bind_b2GearJointDef_get_joint1_0 =
          a.asm.Yk).apply(null, arguments);
      }),
      dn = (a._emscripten_bind_b2GearJointDef_set_joint1_1 = function () {
        return (dn = a._emscripten_bind_b2GearJointDef_set_joint1_1 =
          a.asm.Zk).apply(null, arguments);
      }),
      en = (a._emscripten_bind_b2GearJointDef_get_joint2_0 = function () {
        return (en = a._emscripten_bind_b2GearJointDef_get_joint2_0 =
          a.asm._k).apply(null, arguments);
      }),
      fn = (a._emscripten_bind_b2GearJointDef_set_joint2_1 = function () {
        return (fn = a._emscripten_bind_b2GearJointDef_set_joint2_1 =
          a.asm.$k).apply(null, arguments);
      }),
      gn = (a._emscripten_bind_b2GearJointDef_get_ratio_0 = function () {
        return (gn = a._emscripten_bind_b2GearJointDef_get_ratio_0 =
          a.asm.al).apply(null, arguments);
      }),
      hn = (a._emscripten_bind_b2GearJointDef_set_ratio_1 = function () {
        return (hn = a._emscripten_bind_b2GearJointDef_set_ratio_1 =
          a.asm.bl).apply(null, arguments);
      }),
      jn = (a._emscripten_bind_b2GearJointDef_get_type_0 = function () {
        return (jn = a._emscripten_bind_b2GearJointDef_get_type_0 =
          a.asm.cl).apply(null, arguments);
      }),
      kn = (a._emscripten_bind_b2GearJointDef_set_type_1 = function () {
        return (kn = a._emscripten_bind_b2GearJointDef_set_type_1 =
          a.asm.dl).apply(null, arguments);
      }),
      ln = (a._emscripten_bind_b2GearJointDef_get_userData_0 = function () {
        return (ln = a._emscripten_bind_b2GearJointDef_get_userData_0 =
          a.asm.el).apply(null, arguments);
      }),
      mn = (a._emscripten_bind_b2GearJointDef_set_userData_1 = function () {
        return (mn = a._emscripten_bind_b2GearJointDef_set_userData_1 =
          a.asm.fl).apply(null, arguments);
      }),
      nn = (a._emscripten_bind_b2GearJointDef_get_bodyA_0 = function () {
        return (nn = a._emscripten_bind_b2GearJointDef_get_bodyA_0 =
          a.asm.gl).apply(null, arguments);
      }),
      on = (a._emscripten_bind_b2GearJointDef_set_bodyA_1 = function () {
        return (on = a._emscripten_bind_b2GearJointDef_set_bodyA_1 =
          a.asm.hl).apply(null, arguments);
      }),
      pn = (a._emscripten_bind_b2GearJointDef_get_bodyB_0 = function () {
        return (pn = a._emscripten_bind_b2GearJointDef_get_bodyB_0 =
          a.asm.il).apply(null, arguments);
      }),
      qn = (a._emscripten_bind_b2GearJointDef_set_bodyB_1 = function () {
        return (qn = a._emscripten_bind_b2GearJointDef_set_bodyB_1 =
          a.asm.jl).apply(null, arguments);
      }),
      rn = (a._emscripten_bind_b2GearJointDef_get_collideConnected_0 =
        function () {
          return (rn =
            a._emscripten_bind_b2GearJointDef_get_collideConnected_0 =
              a.asm.kl).apply(null, arguments);
        }),
      sn = (a._emscripten_bind_b2GearJointDef_set_collideConnected_1 =
        function () {
          return (sn =
            a._emscripten_bind_b2GearJointDef_set_collideConnected_1 =
              a.asm.ll).apply(null, arguments);
        }),
      tn = (a._emscripten_bind_b2GearJointDef___destroy___0 = function () {
        return (tn = a._emscripten_bind_b2GearJointDef___destroy___0 =
          a.asm.ml).apply(null, arguments);
      }),
      un = (a._emscripten_bind_b2JointEdge_b2JointEdge_0 = function () {
        return (un = a._emscripten_bind_b2JointEdge_b2JointEdge_0 =
          a.asm.nl).apply(null, arguments);
      }),
      vn = (a._emscripten_bind_b2JointEdge_get_other_0 = function () {
        return (vn = a._emscripten_bind_b2JointEdge_get_other_0 =
          a.asm.ol).apply(null, arguments);
      }),
      wn = (a._emscripten_bind_b2JointEdge_set_other_1 = function () {
        return (wn = a._emscripten_bind_b2JointEdge_set_other_1 =
          a.asm.pl).apply(null, arguments);
      }),
      xn = (a._emscripten_bind_b2JointEdge_get_joint_0 = function () {
        return (xn = a._emscripten_bind_b2JointEdge_get_joint_0 =
          a.asm.ql).apply(null, arguments);
      }),
      yn = (a._emscripten_bind_b2JointEdge_set_joint_1 = function () {
        return (yn = a._emscripten_bind_b2JointEdge_set_joint_1 =
          a.asm.rl).apply(null, arguments);
      }),
      zn = (a._emscripten_bind_b2JointEdge_get_prev_0 = function () {
        return (zn = a._emscripten_bind_b2JointEdge_get_prev_0 =
          a.asm.sl).apply(null, arguments);
      }),
      An = (a._emscripten_bind_b2JointEdge_set_prev_1 = function () {
        return (An = a._emscripten_bind_b2JointEdge_set_prev_1 =
          a.asm.tl).apply(null, arguments);
      }),
      Bn = (a._emscripten_bind_b2JointEdge_get_next_0 = function () {
        return (Bn = a._emscripten_bind_b2JointEdge_get_next_0 =
          a.asm.ul).apply(null, arguments);
      }),
      Cn = (a._emscripten_bind_b2JointEdge_set_next_1 = function () {
        return (Cn = a._emscripten_bind_b2JointEdge_set_next_1 =
          a.asm.vl).apply(null, arguments);
      }),
      Dn = (a._emscripten_bind_b2JointEdge___destroy___0 = function () {
        return (Dn = a._emscripten_bind_b2JointEdge___destroy___0 =
          a.asm.wl).apply(null, arguments);
      }),
      En = (a._emscripten_bind_b2Manifold_b2Manifold_0 = function () {
        return (En = a._emscripten_bind_b2Manifold_b2Manifold_0 =
          a.asm.xl).apply(null, arguments);
      }),
      Fn = (a._emscripten_bind_b2Manifold_get_points_1 = function () {
        return (Fn = a._emscripten_bind_b2Manifold_get_points_1 =
          a.asm.yl).apply(null, arguments);
      }),
      Gn = (a._emscripten_bind_b2Manifold_set_points_2 = function () {
        return (Gn = a._emscripten_bind_b2Manifold_set_points_2 =
          a.asm.zl).apply(null, arguments);
      }),
      Hn = (a._emscripten_bind_b2Manifold_get_localNormal_0 = function () {
        return (Hn = a._emscripten_bind_b2Manifold_get_localNormal_0 =
          a.asm.Al).apply(null, arguments);
      }),
      In = (a._emscripten_bind_b2Manifold_set_localNormal_1 = function () {
        return (In = a._emscripten_bind_b2Manifold_set_localNormal_1 =
          a.asm.Bl).apply(null, arguments);
      }),
      Jn = (a._emscripten_bind_b2Manifold_get_localPoint_0 = function () {
        return (Jn = a._emscripten_bind_b2Manifold_get_localPoint_0 =
          a.asm.Cl).apply(null, arguments);
      }),
      Kn = (a._emscripten_bind_b2Manifold_set_localPoint_1 = function () {
        return (Kn = a._emscripten_bind_b2Manifold_set_localPoint_1 =
          a.asm.Dl).apply(null, arguments);
      }),
      Ln = (a._emscripten_bind_b2Manifold_get_type_0 = function () {
        return (Ln = a._emscripten_bind_b2Manifold_get_type_0 = a.asm.El).apply(
          null,
          arguments,
        );
      }),
      Mn = (a._emscripten_bind_b2Manifold_set_type_1 = function () {
        return (Mn = a._emscripten_bind_b2Manifold_set_type_1 = a.asm.Fl).apply(
          null,
          arguments,
        );
      }),
      Nn = (a._emscripten_bind_b2Manifold_get_pointCount_0 = function () {
        return (Nn = a._emscripten_bind_b2Manifold_get_pointCount_0 =
          a.asm.Gl).apply(null, arguments);
      }),
      On = (a._emscripten_bind_b2Manifold_set_pointCount_1 = function () {
        return (On = a._emscripten_bind_b2Manifold_set_pointCount_1 =
          a.asm.Hl).apply(null, arguments);
      }),
      Pn = (a._emscripten_bind_b2Manifold___destroy___0 = function () {
        return (Pn = a._emscripten_bind_b2Manifold___destroy___0 =
          a.asm.Il).apply(null, arguments);
      }),
      Qn = (a._emscripten_bind_b2WorldManifold_b2WorldManifold_0 = function () {
        return (Qn = a._emscripten_bind_b2WorldManifold_b2WorldManifold_0 =
          a.asm.Jl).apply(null, arguments);
      }),
      Rn = (a._emscripten_bind_b2WorldManifold_Initialize_5 = function () {
        return (Rn = a._emscripten_bind_b2WorldManifold_Initialize_5 =
          a.asm.Kl).apply(null, arguments);
      }),
      Sn = (a._emscripten_bind_b2WorldManifold_get_normal_0 = function () {
        return (Sn = a._emscripten_bind_b2WorldManifold_get_normal_0 =
          a.asm.Ll).apply(null, arguments);
      }),
      Tn = (a._emscripten_bind_b2WorldManifold_set_normal_1 = function () {
        return (Tn = a._emscripten_bind_b2WorldManifold_set_normal_1 =
          a.asm.Ml).apply(null, arguments);
      }),
      Un = (a._emscripten_bind_b2WorldManifold_get_points_1 = function () {
        return (Un = a._emscripten_bind_b2WorldManifold_get_points_1 =
          a.asm.Nl).apply(null, arguments);
      }),
      Vn = (a._emscripten_bind_b2WorldManifold_set_points_2 = function () {
        return (Vn = a._emscripten_bind_b2WorldManifold_set_points_2 =
          a.asm.Ol).apply(null, arguments);
      }),
      Wn = (a._emscripten_bind_b2WorldManifold_get_separations_1 = function () {
        return (Wn = a._emscripten_bind_b2WorldManifold_get_separations_1 =
          a.asm.Pl).apply(null, arguments);
      }),
      Xn = (a._emscripten_bind_b2WorldManifold_set_separations_2 = function () {
        return (Xn = a._emscripten_bind_b2WorldManifold_set_separations_2 =
          a.asm.Ql).apply(null, arguments);
      }),
      Yn = (a._emscripten_bind_b2WorldManifold___destroy___0 = function () {
        return (Yn = a._emscripten_bind_b2WorldManifold___destroy___0 =
          a.asm.Rl).apply(null, arguments);
      }),
      Zn = (a._emscripten_bind_b2ManifoldPoint_b2ManifoldPoint_0 = function () {
        return (Zn = a._emscripten_bind_b2ManifoldPoint_b2ManifoldPoint_0 =
          a.asm.Sl).apply(null, arguments);
      }),
      $n = (a._emscripten_bind_b2ManifoldPoint_get_localPoint_0 = function () {
        return ($n = a._emscripten_bind_b2ManifoldPoint_get_localPoint_0 =
          a.asm.Tl).apply(null, arguments);
      }),
      ao = (a._emscripten_bind_b2ManifoldPoint_set_localPoint_1 = function () {
        return (ao = a._emscripten_bind_b2ManifoldPoint_set_localPoint_1 =
          a.asm.Ul).apply(null, arguments);
      }),
      bo = (a._emscripten_bind_b2ManifoldPoint_get_normalImpulse_0 =
        function () {
          return (bo = a._emscripten_bind_b2ManifoldPoint_get_normalImpulse_0 =
            a.asm.Vl).apply(null, arguments);
        }),
      co = (a._emscripten_bind_b2ManifoldPoint_set_normalImpulse_1 =
        function () {
          return (co = a._emscripten_bind_b2ManifoldPoint_set_normalImpulse_1 =
            a.asm.Wl).apply(null, arguments);
        }),
      eo = (a._emscripten_bind_b2ManifoldPoint_get_tangentImpulse_0 =
        function () {
          return (eo = a._emscripten_bind_b2ManifoldPoint_get_tangentImpulse_0 =
            a.asm.Xl).apply(null, arguments);
        }),
      fo = (a._emscripten_bind_b2ManifoldPoint_set_tangentImpulse_1 =
        function () {
          return (fo = a._emscripten_bind_b2ManifoldPoint_set_tangentImpulse_1 =
            a.asm.Yl).apply(null, arguments);
        }),
      go = (a._emscripten_bind_b2ManifoldPoint_get_id_0 = function () {
        return (go = a._emscripten_bind_b2ManifoldPoint_get_id_0 =
          a.asm.Zl).apply(null, arguments);
      }),
      ho = (a._emscripten_bind_b2ManifoldPoint_set_id_1 = function () {
        return (ho = a._emscripten_bind_b2ManifoldPoint_set_id_1 =
          a.asm._l).apply(null, arguments);
      }),
      io = (a._emscripten_bind_b2ManifoldPoint___destroy___0 = function () {
        return (io = a._emscripten_bind_b2ManifoldPoint___destroy___0 =
          a.asm.$l).apply(null, arguments);
      }),
      jo = (a._emscripten_bind_b2Mat22_b2Mat22_0 = function () {
        return (jo = a._emscripten_bind_b2Mat22_b2Mat22_0 = a.asm.am).apply(
          null,
          arguments,
        );
      }),
      ko = (a._emscripten_bind_b2Mat22_b2Mat22_2 = function () {
        return (ko = a._emscripten_bind_b2Mat22_b2Mat22_2 = a.asm.bm).apply(
          null,
          arguments,
        );
      }),
      lo = (a._emscripten_bind_b2Mat22_b2Mat22_4 = function () {
        return (lo = a._emscripten_bind_b2Mat22_b2Mat22_4 = a.asm.cm).apply(
          null,
          arguments,
        );
      }),
      mo = (a._emscripten_bind_b2Mat22_Set_2 = function () {
        return (mo = a._emscripten_bind_b2Mat22_Set_2 = a.asm.dm).apply(
          null,
          arguments,
        );
      }),
      no = (a._emscripten_bind_b2Mat22_SetIdentity_0 = function () {
        return (no = a._emscripten_bind_b2Mat22_SetIdentity_0 = a.asm.em).apply(
          null,
          arguments,
        );
      }),
      oo = (a._emscripten_bind_b2Mat22_SetZero_0 = function () {
        return (oo = a._emscripten_bind_b2Mat22_SetZero_0 = a.asm.fm).apply(
          null,
          arguments,
        );
      }),
      po = (a._emscripten_bind_b2Mat22_GetInverse_0 = function () {
        return (po = a._emscripten_bind_b2Mat22_GetInverse_0 = a.asm.gm).apply(
          null,
          arguments,
        );
      }),
      qo = (a._emscripten_bind_b2Mat22_Solve_1 = function () {
        return (qo = a._emscripten_bind_b2Mat22_Solve_1 = a.asm.hm).apply(
          null,
          arguments,
        );
      }),
      ro = (a._emscripten_bind_b2Mat22_get_ex_0 = function () {
        return (ro = a._emscripten_bind_b2Mat22_get_ex_0 = a.asm.im).apply(
          null,
          arguments,
        );
      }),
      so = (a._emscripten_bind_b2Mat22_set_ex_1 = function () {
        return (so = a._emscripten_bind_b2Mat22_set_ex_1 = a.asm.jm).apply(
          null,
          arguments,
        );
      }),
      to = (a._emscripten_bind_b2Mat22_get_ey_0 = function () {
        return (to = a._emscripten_bind_b2Mat22_get_ey_0 = a.asm.km).apply(
          null,
          arguments,
        );
      }),
      uo = (a._emscripten_bind_b2Mat22_set_ey_1 = function () {
        return (uo = a._emscripten_bind_b2Mat22_set_ey_1 = a.asm.lm).apply(
          null,
          arguments,
        );
      }),
      vo = (a._emscripten_bind_b2Mat22___destroy___0 = function () {
        return (vo = a._emscripten_bind_b2Mat22___destroy___0 = a.asm.mm).apply(
          null,
          arguments,
        );
      }),
      wo = (a._emscripten_bind_b2Mat33_b2Mat33_0 = function () {
        return (wo = a._emscripten_bind_b2Mat33_b2Mat33_0 = a.asm.nm).apply(
          null,
          arguments,
        );
      }),
      xo = (a._emscripten_bind_b2Mat33_b2Mat33_3 = function () {
        return (xo = a._emscripten_bind_b2Mat33_b2Mat33_3 = a.asm.om).apply(
          null,
          arguments,
        );
      }),
      yo = (a._emscripten_bind_b2Mat33_SetZero_0 = function () {
        return (yo = a._emscripten_bind_b2Mat33_SetZero_0 = a.asm.pm).apply(
          null,
          arguments,
        );
      }),
      zo = (a._emscripten_bind_b2Mat33_Solve33_1 = function () {
        return (zo = a._emscripten_bind_b2Mat33_Solve33_1 = a.asm.qm).apply(
          null,
          arguments,
        );
      }),
      Ao = (a._emscripten_bind_b2Mat33_Solve22_1 = function () {
        return (Ao = a._emscripten_bind_b2Mat33_Solve22_1 = a.asm.rm).apply(
          null,
          arguments,
        );
      }),
      Bo = (a._emscripten_bind_b2Mat33_GetInverse22_1 = function () {
        return (Bo = a._emscripten_bind_b2Mat33_GetInverse22_1 =
          a.asm.sm).apply(null, arguments);
      }),
      Co = (a._emscripten_bind_b2Mat33_GetSymInverse33_1 = function () {
        return (Co = a._emscripten_bind_b2Mat33_GetSymInverse33_1 =
          a.asm.tm).apply(null, arguments);
      }),
      Do = (a._emscripten_bind_b2Mat33_get_ex_0 = function () {
        return (Do = a._emscripten_bind_b2Mat33_get_ex_0 = a.asm.um).apply(
          null,
          arguments,
        );
      }),
      Eo = (a._emscripten_bind_b2Mat33_set_ex_1 = function () {
        return (Eo = a._emscripten_bind_b2Mat33_set_ex_1 = a.asm.vm).apply(
          null,
          arguments,
        );
      }),
      Fo = (a._emscripten_bind_b2Mat33_get_ey_0 = function () {
        return (Fo = a._emscripten_bind_b2Mat33_get_ey_0 = a.asm.wm).apply(
          null,
          arguments,
        );
      }),
      Go = (a._emscripten_bind_b2Mat33_set_ey_1 = function () {
        return (Go = a._emscripten_bind_b2Mat33_set_ey_1 = a.asm.xm).apply(
          null,
          arguments,
        );
      }),
      Ho = (a._emscripten_bind_b2Mat33_get_ez_0 = function () {
        return (Ho = a._emscripten_bind_b2Mat33_get_ez_0 = a.asm.ym).apply(
          null,
          arguments,
        );
      }),
      Io = (a._emscripten_bind_b2Mat33_set_ez_1 = function () {
        return (Io = a._emscripten_bind_b2Mat33_set_ez_1 = a.asm.zm).apply(
          null,
          arguments,
        );
      }),
      Jo = (a._emscripten_bind_b2Mat33___destroy___0 = function () {
        return (Jo = a._emscripten_bind_b2Mat33___destroy___0 = a.asm.Am).apply(
          null,
          arguments,
        );
      }),
      Ko = (a._emscripten_bind_b2MouseJoint_SetTarget_1 = function () {
        return (Ko = a._emscripten_bind_b2MouseJoint_SetTarget_1 =
          a.asm.Bm).apply(null, arguments);
      }),
      Lo = (a._emscripten_bind_b2MouseJoint_GetTarget_0 = function () {
        return (Lo = a._emscripten_bind_b2MouseJoint_GetTarget_0 =
          a.asm.Cm).apply(null, arguments);
      }),
      Mo = (a._emscripten_bind_b2MouseJoint_SetMaxForce_1 = function () {
        return (Mo = a._emscripten_bind_b2MouseJoint_SetMaxForce_1 =
          a.asm.Dm).apply(null, arguments);
      }),
      No = (a._emscripten_bind_b2MouseJoint_GetMaxForce_0 = function () {
        return (No = a._emscripten_bind_b2MouseJoint_GetMaxForce_0 =
          a.asm.Em).apply(null, arguments);
      }),
      Oo = (a._emscripten_bind_b2MouseJoint_SetStiffness_1 = function () {
        return (Oo = a._emscripten_bind_b2MouseJoint_SetStiffness_1 =
          a.asm.Fm).apply(null, arguments);
      }),
      Po = (a._emscripten_bind_b2MouseJoint_GetStiffness_0 = function () {
        return (Po = a._emscripten_bind_b2MouseJoint_GetStiffness_0 =
          a.asm.Gm).apply(null, arguments);
      }),
      Qo = (a._emscripten_bind_b2MouseJoint_SetDamping_1 = function () {
        return (Qo = a._emscripten_bind_b2MouseJoint_SetDamping_1 =
          a.asm.Hm).apply(null, arguments);
      }),
      Ro = (a._emscripten_bind_b2MouseJoint_GetDamping_0 = function () {
        return (Ro = a._emscripten_bind_b2MouseJoint_GetDamping_0 =
          a.asm.Im).apply(null, arguments);
      }),
      So = (a._emscripten_bind_b2MouseJoint_GetType_0 = function () {
        return (So = a._emscripten_bind_b2MouseJoint_GetType_0 =
          a.asm.Jm).apply(null, arguments);
      }),
      To = (a._emscripten_bind_b2MouseJoint_GetBodyA_0 = function () {
        return (To = a._emscripten_bind_b2MouseJoint_GetBodyA_0 =
          a.asm.Km).apply(null, arguments);
      }),
      Uo = (a._emscripten_bind_b2MouseJoint_GetBodyB_0 = function () {
        return (Uo = a._emscripten_bind_b2MouseJoint_GetBodyB_0 =
          a.asm.Lm).apply(null, arguments);
      }),
      Vo = (a._emscripten_bind_b2MouseJoint_GetAnchorA_0 = function () {
        return (Vo = a._emscripten_bind_b2MouseJoint_GetAnchorA_0 =
          a.asm.Mm).apply(null, arguments);
      }),
      Wo = (a._emscripten_bind_b2MouseJoint_GetAnchorB_0 = function () {
        return (Wo = a._emscripten_bind_b2MouseJoint_GetAnchorB_0 =
          a.asm.Nm).apply(null, arguments);
      }),
      Xo = (a._emscripten_bind_b2MouseJoint_GetReactionForce_1 = function () {
        return (Xo = a._emscripten_bind_b2MouseJoint_GetReactionForce_1 =
          a.asm.Om).apply(null, arguments);
      }),
      Yo = (a._emscripten_bind_b2MouseJoint_GetReactionTorque_1 = function () {
        return (Yo = a._emscripten_bind_b2MouseJoint_GetReactionTorque_1 =
          a.asm.Pm).apply(null, arguments);
      }),
      Zo = (a._emscripten_bind_b2MouseJoint_GetNext_0 = function () {
        return (Zo = a._emscripten_bind_b2MouseJoint_GetNext_0 =
          a.asm.Qm).apply(null, arguments);
      }),
      $o = (a._emscripten_bind_b2MouseJoint_GetUserData_0 = function () {
        return ($o = a._emscripten_bind_b2MouseJoint_GetUserData_0 =
          a.asm.Rm).apply(null, arguments);
      }),
      ap = (a._emscripten_bind_b2MouseJoint_GetCollideConnected_0 =
        function () {
          return (ap = a._emscripten_bind_b2MouseJoint_GetCollideConnected_0 =
            a.asm.Sm).apply(null, arguments);
        }),
      bp = (a._emscripten_bind_b2MouseJoint___destroy___0 = function () {
        return (bp = a._emscripten_bind_b2MouseJoint___destroy___0 =
          a.asm.Tm).apply(null, arguments);
      }),
      cp = (a._emscripten_bind_b2MouseJointDef_b2MouseJointDef_0 = function () {
        return (cp = a._emscripten_bind_b2MouseJointDef_b2MouseJointDef_0 =
          a.asm.Um).apply(null, arguments);
      }),
      dp = (a._emscripten_bind_b2MouseJointDef_get_target_0 = function () {
        return (dp = a._emscripten_bind_b2MouseJointDef_get_target_0 =
          a.asm.Vm).apply(null, arguments);
      }),
      ep = (a._emscripten_bind_b2MouseJointDef_set_target_1 = function () {
        return (ep = a._emscripten_bind_b2MouseJointDef_set_target_1 =
          a.asm.Wm).apply(null, arguments);
      }),
      fp = (a._emscripten_bind_b2MouseJointDef_get_maxForce_0 = function () {
        return (fp = a._emscripten_bind_b2MouseJointDef_get_maxForce_0 =
          a.asm.Xm).apply(null, arguments);
      }),
      gp = (a._emscripten_bind_b2MouseJointDef_set_maxForce_1 = function () {
        return (gp = a._emscripten_bind_b2MouseJointDef_set_maxForce_1 =
          a.asm.Ym).apply(null, arguments);
      }),
      hp = (a._emscripten_bind_b2MouseJointDef_get_stiffness_0 = function () {
        return (hp = a._emscripten_bind_b2MouseJointDef_get_stiffness_0 =
          a.asm.Zm).apply(null, arguments);
      }),
      ip = (a._emscripten_bind_b2MouseJointDef_set_stiffness_1 = function () {
        return (ip = a._emscripten_bind_b2MouseJointDef_set_stiffness_1 =
          a.asm._m).apply(null, arguments);
      }),
      jp = (a._emscripten_bind_b2MouseJointDef_get_damping_0 = function () {
        return (jp = a._emscripten_bind_b2MouseJointDef_get_damping_0 =
          a.asm.$m).apply(null, arguments);
      }),
      kp = (a._emscripten_bind_b2MouseJointDef_set_damping_1 = function () {
        return (kp = a._emscripten_bind_b2MouseJointDef_set_damping_1 =
          a.asm.an).apply(null, arguments);
      }),
      lp = (a._emscripten_bind_b2MouseJointDef_get_type_0 = function () {
        return (lp = a._emscripten_bind_b2MouseJointDef_get_type_0 =
          a.asm.bn).apply(null, arguments);
      }),
      mp = (a._emscripten_bind_b2MouseJointDef_set_type_1 = function () {
        return (mp = a._emscripten_bind_b2MouseJointDef_set_type_1 =
          a.asm.cn).apply(null, arguments);
      }),
      np = (a._emscripten_bind_b2MouseJointDef_get_userData_0 = function () {
        return (np = a._emscripten_bind_b2MouseJointDef_get_userData_0 =
          a.asm.dn).apply(null, arguments);
      }),
      op = (a._emscripten_bind_b2MouseJointDef_set_userData_1 = function () {
        return (op = a._emscripten_bind_b2MouseJointDef_set_userData_1 =
          a.asm.en).apply(null, arguments);
      }),
      pp = (a._emscripten_bind_b2MouseJointDef_get_bodyA_0 = function () {
        return (pp = a._emscripten_bind_b2MouseJointDef_get_bodyA_0 =
          a.asm.fn).apply(null, arguments);
      }),
      qp = (a._emscripten_bind_b2MouseJointDef_set_bodyA_1 = function () {
        return (qp = a._emscripten_bind_b2MouseJointDef_set_bodyA_1 =
          a.asm.gn).apply(null, arguments);
      }),
      rp = (a._emscripten_bind_b2MouseJointDef_get_bodyB_0 = function () {
        return (rp = a._emscripten_bind_b2MouseJointDef_get_bodyB_0 =
          a.asm.hn).apply(null, arguments);
      }),
      sp = (a._emscripten_bind_b2MouseJointDef_set_bodyB_1 = function () {
        return (sp = a._emscripten_bind_b2MouseJointDef_set_bodyB_1 =
          a.asm.jn).apply(null, arguments);
      }),
      tp = (a._emscripten_bind_b2MouseJointDef_get_collideConnected_0 =
        function () {
          return (tp =
            a._emscripten_bind_b2MouseJointDef_get_collideConnected_0 =
              a.asm.kn).apply(null, arguments);
        }),
      up = (a._emscripten_bind_b2MouseJointDef_set_collideConnected_1 =
        function () {
          return (up =
            a._emscripten_bind_b2MouseJointDef_set_collideConnected_1 =
              a.asm.ln).apply(null, arguments);
        }),
      vp = (a._emscripten_bind_b2MouseJointDef___destroy___0 = function () {
        return (vp = a._emscripten_bind_b2MouseJointDef___destroy___0 =
          a.asm.mn).apply(null, arguments);
      }),
      wp = (a._emscripten_bind_b2PolygonShape_b2PolygonShape_0 = function () {
        return (wp = a._emscripten_bind_b2PolygonShape_b2PolygonShape_0 =
          a.asm.nn).apply(null, arguments);
      }),
      xp = (a._emscripten_bind_b2PolygonShape_Set_2 = function () {
        return (xp = a._emscripten_bind_b2PolygonShape_Set_2 = a.asm.on).apply(
          null,
          arguments,
        );
      }),
      yp = (a._emscripten_bind_b2PolygonShape_SetAsBox_2 = function () {
        return (yp = a._emscripten_bind_b2PolygonShape_SetAsBox_2 =
          a.asm.pn).apply(null, arguments);
      }),
      zp = (a._emscripten_bind_b2PolygonShape_SetAsBox_4 = function () {
        return (zp = a._emscripten_bind_b2PolygonShape_SetAsBox_4 =
          a.asm.qn).apply(null, arguments);
      }),
      Ap = (a._emscripten_bind_b2PolygonShape_GetType_0 = function () {
        return (Ap = a._emscripten_bind_b2PolygonShape_GetType_0 =
          a.asm.rn).apply(null, arguments);
      }),
      Bp = (a._emscripten_bind_b2PolygonShape_GetChildCount_0 = function () {
        return (Bp = a._emscripten_bind_b2PolygonShape_GetChildCount_0 =
          a.asm.sn).apply(null, arguments);
      }),
      Cp = (a._emscripten_bind_b2PolygonShape_TestPoint_2 = function () {
        return (Cp = a._emscripten_bind_b2PolygonShape_TestPoint_2 =
          a.asm.tn).apply(null, arguments);
      }),
      Dp = (a._emscripten_bind_b2PolygonShape_RayCast_4 = function () {
        return (Dp = a._emscripten_bind_b2PolygonShape_RayCast_4 =
          a.asm.un).apply(null, arguments);
      }),
      Ep = (a._emscripten_bind_b2PolygonShape_ComputeAABB_3 = function () {
        return (Ep = a._emscripten_bind_b2PolygonShape_ComputeAABB_3 =
          a.asm.vn).apply(null, arguments);
      }),
      Fp = (a._emscripten_bind_b2PolygonShape_ComputeMass_2 = function () {
        return (Fp = a._emscripten_bind_b2PolygonShape_ComputeMass_2 =
          a.asm.wn).apply(null, arguments);
      }),
      Gp = (a._emscripten_bind_b2PolygonShape_get_m_centroid_0 = function () {
        return (Gp = a._emscripten_bind_b2PolygonShape_get_m_centroid_0 =
          a.asm.xn).apply(null, arguments);
      }),
      Hp = (a._emscripten_bind_b2PolygonShape_set_m_centroid_1 = function () {
        return (Hp = a._emscripten_bind_b2PolygonShape_set_m_centroid_1 =
          a.asm.yn).apply(null, arguments);
      }),
      Ip = (a._emscripten_bind_b2PolygonShape_get_m_vertices_1 = function () {
        return (Ip = a._emscripten_bind_b2PolygonShape_get_m_vertices_1 =
          a.asm.zn).apply(null, arguments);
      }),
      Jp = (a._emscripten_bind_b2PolygonShape_set_m_vertices_2 = function () {
        return (Jp = a._emscripten_bind_b2PolygonShape_set_m_vertices_2 =
          a.asm.An).apply(null, arguments);
      }),
      Kp = (a._emscripten_bind_b2PolygonShape_get_m_normals_1 = function () {
        return (Kp = a._emscripten_bind_b2PolygonShape_get_m_normals_1 =
          a.asm.Bn).apply(null, arguments);
      }),
      Lp = (a._emscripten_bind_b2PolygonShape_set_m_normals_2 = function () {
        return (Lp = a._emscripten_bind_b2PolygonShape_set_m_normals_2 =
          a.asm.Cn).apply(null, arguments);
      }),
      Mp = (a._emscripten_bind_b2PolygonShape_get_m_count_0 = function () {
        return (Mp = a._emscripten_bind_b2PolygonShape_get_m_count_0 =
          a.asm.Dn).apply(null, arguments);
      }),
      Np = (a._emscripten_bind_b2PolygonShape_set_m_count_1 = function () {
        return (Np = a._emscripten_bind_b2PolygonShape_set_m_count_1 =
          a.asm.En).apply(null, arguments);
      }),
      Op = (a._emscripten_bind_b2PolygonShape_get_m_type_0 = function () {
        return (Op = a._emscripten_bind_b2PolygonShape_get_m_type_0 =
          a.asm.Fn).apply(null, arguments);
      }),
      Pp = (a._emscripten_bind_b2PolygonShape_set_m_type_1 = function () {
        return (Pp = a._emscripten_bind_b2PolygonShape_set_m_type_1 =
          a.asm.Gn).apply(null, arguments);
      }),
      Qp = (a._emscripten_bind_b2PolygonShape_get_m_radius_0 = function () {
        return (Qp = a._emscripten_bind_b2PolygonShape_get_m_radius_0 =
          a.asm.Hn).apply(null, arguments);
      }),
      Rp = (a._emscripten_bind_b2PolygonShape_set_m_radius_1 = function () {
        return (Rp = a._emscripten_bind_b2PolygonShape_set_m_radius_1 =
          a.asm.In).apply(null, arguments);
      }),
      Sp = (a._emscripten_bind_b2PolygonShape___destroy___0 = function () {
        return (Sp = a._emscripten_bind_b2PolygonShape___destroy___0 =
          a.asm.Jn).apply(null, arguments);
      }),
      Tp = (a._emscripten_bind_b2PrismaticJoint_GetLocalAnchorA_0 =
        function () {
          return (Tp = a._emscripten_bind_b2PrismaticJoint_GetLocalAnchorA_0 =
            a.asm.Kn).apply(null, arguments);
        }),
      Up = (a._emscripten_bind_b2PrismaticJoint_GetLocalAnchorB_0 =
        function () {
          return (Up = a._emscripten_bind_b2PrismaticJoint_GetLocalAnchorB_0 =
            a.asm.Ln).apply(null, arguments);
        }),
      Vp = (a._emscripten_bind_b2PrismaticJoint_GetLocalAxisA_0 = function () {
        return (Vp = a._emscripten_bind_b2PrismaticJoint_GetLocalAxisA_0 =
          a.asm.Mn).apply(null, arguments);
      }),
      Wp = (a._emscripten_bind_b2PrismaticJoint_GetReferenceAngle_0 =
        function () {
          return (Wp = a._emscripten_bind_b2PrismaticJoint_GetReferenceAngle_0 =
            a.asm.Nn).apply(null, arguments);
        }),
      Xp = (a._emscripten_bind_b2PrismaticJoint_GetJointTranslation_0 =
        function () {
          return (Xp =
            a._emscripten_bind_b2PrismaticJoint_GetJointTranslation_0 =
              a.asm.On).apply(null, arguments);
        }),
      Yp = (a._emscripten_bind_b2PrismaticJoint_GetJointSpeed_0 = function () {
        return (Yp = a._emscripten_bind_b2PrismaticJoint_GetJointSpeed_0 =
          a.asm.Pn).apply(null, arguments);
      }),
      Zp = (a._emscripten_bind_b2PrismaticJoint_IsLimitEnabled_0 = function () {
        return (Zp = a._emscripten_bind_b2PrismaticJoint_IsLimitEnabled_0 =
          a.asm.Qn).apply(null, arguments);
      }),
      $p = (a._emscripten_bind_b2PrismaticJoint_EnableLimit_1 = function () {
        return ($p = a._emscripten_bind_b2PrismaticJoint_EnableLimit_1 =
          a.asm.Rn).apply(null, arguments);
      }),
      aq = (a._emscripten_bind_b2PrismaticJoint_GetLowerLimit_0 = function () {
        return (aq = a._emscripten_bind_b2PrismaticJoint_GetLowerLimit_0 =
          a.asm.Sn).apply(null, arguments);
      }),
      bq = (a._emscripten_bind_b2PrismaticJoint_GetUpperLimit_0 = function () {
        return (bq = a._emscripten_bind_b2PrismaticJoint_GetUpperLimit_0 =
          a.asm.Tn).apply(null, arguments);
      }),
      cq = (a._emscripten_bind_b2PrismaticJoint_SetLimits_2 = function () {
        return (cq = a._emscripten_bind_b2PrismaticJoint_SetLimits_2 =
          a.asm.Un).apply(null, arguments);
      }),
      dq = (a._emscripten_bind_b2PrismaticJoint_IsMotorEnabled_0 = function () {
        return (dq = a._emscripten_bind_b2PrismaticJoint_IsMotorEnabled_0 =
          a.asm.Vn).apply(null, arguments);
      }),
      eq = (a._emscripten_bind_b2PrismaticJoint_EnableMotor_1 = function () {
        return (eq = a._emscripten_bind_b2PrismaticJoint_EnableMotor_1 =
          a.asm.Wn).apply(null, arguments);
      }),
      fq = (a._emscripten_bind_b2PrismaticJoint_SetMotorSpeed_1 = function () {
        return (fq = a._emscripten_bind_b2PrismaticJoint_SetMotorSpeed_1 =
          a.asm.Xn).apply(null, arguments);
      }),
      gq = (a._emscripten_bind_b2PrismaticJoint_GetMotorSpeed_0 = function () {
        return (gq = a._emscripten_bind_b2PrismaticJoint_GetMotorSpeed_0 =
          a.asm.Yn).apply(null, arguments);
      }),
      hq = (a._emscripten_bind_b2PrismaticJoint_SetMaxMotorForce_1 =
        function () {
          return (hq = a._emscripten_bind_b2PrismaticJoint_SetMaxMotorForce_1 =
            a.asm.Zn).apply(null, arguments);
        }),
      iq = (a._emscripten_bind_b2PrismaticJoint_GetMaxMotorForce_0 =
        function () {
          return (iq = a._emscripten_bind_b2PrismaticJoint_GetMaxMotorForce_0 =
            a.asm._n).apply(null, arguments);
        }),
      jq = (a._emscripten_bind_b2PrismaticJoint_GetMotorForce_1 = function () {
        return (jq = a._emscripten_bind_b2PrismaticJoint_GetMotorForce_1 =
          a.asm.$n).apply(null, arguments);
      }),
      kq = (a._emscripten_bind_b2PrismaticJoint_GetType_0 = function () {
        return (kq = a._emscripten_bind_b2PrismaticJoint_GetType_0 =
          a.asm.ao).apply(null, arguments);
      }),
      lq = (a._emscripten_bind_b2PrismaticJoint_GetBodyA_0 = function () {
        return (lq = a._emscripten_bind_b2PrismaticJoint_GetBodyA_0 =
          a.asm.bo).apply(null, arguments);
      }),
      mq = (a._emscripten_bind_b2PrismaticJoint_GetBodyB_0 = function () {
        return (mq = a._emscripten_bind_b2PrismaticJoint_GetBodyB_0 =
          a.asm.co).apply(null, arguments);
      }),
      nq = (a._emscripten_bind_b2PrismaticJoint_GetAnchorA_0 = function () {
        return (nq = a._emscripten_bind_b2PrismaticJoint_GetAnchorA_0 =
          a.asm.eo).apply(null, arguments);
      }),
      oq = (a._emscripten_bind_b2PrismaticJoint_GetAnchorB_0 = function () {
        return (oq = a._emscripten_bind_b2PrismaticJoint_GetAnchorB_0 =
          a.asm.fo).apply(null, arguments);
      }),
      pq = (a._emscripten_bind_b2PrismaticJoint_GetReactionForce_1 =
        function () {
          return (pq = a._emscripten_bind_b2PrismaticJoint_GetReactionForce_1 =
            a.asm.go).apply(null, arguments);
        }),
      qq = (a._emscripten_bind_b2PrismaticJoint_GetReactionTorque_1 =
        function () {
          return (qq = a._emscripten_bind_b2PrismaticJoint_GetReactionTorque_1 =
            a.asm.ho).apply(null, arguments);
        }),
      rq = (a._emscripten_bind_b2PrismaticJoint_GetNext_0 = function () {
        return (rq = a._emscripten_bind_b2PrismaticJoint_GetNext_0 =
          a.asm.io).apply(null, arguments);
      }),
      sq = (a._emscripten_bind_b2PrismaticJoint_GetUserData_0 = function () {
        return (sq = a._emscripten_bind_b2PrismaticJoint_GetUserData_0 =
          a.asm.jo).apply(null, arguments);
      }),
      tq = (a._emscripten_bind_b2PrismaticJoint_GetCollideConnected_0 =
        function () {
          return (tq =
            a._emscripten_bind_b2PrismaticJoint_GetCollideConnected_0 =
              a.asm.ko).apply(null, arguments);
        }),
      uq = (a._emscripten_bind_b2PrismaticJoint___destroy___0 = function () {
        return (uq = a._emscripten_bind_b2PrismaticJoint___destroy___0 =
          a.asm.lo).apply(null, arguments);
      }),
      vq = (a._emscripten_bind_b2PrismaticJointDef_b2PrismaticJointDef_0 =
        function () {
          return (vq =
            a._emscripten_bind_b2PrismaticJointDef_b2PrismaticJointDef_0 =
              a.asm.mo).apply(null, arguments);
        }),
      wq = (a._emscripten_bind_b2PrismaticJointDef_Initialize_4 = function () {
        return (wq = a._emscripten_bind_b2PrismaticJointDef_Initialize_4 =
          a.asm.no).apply(null, arguments);
      }),
      xq = (a._emscripten_bind_b2PrismaticJointDef_get_localAnchorA_0 =
        function () {
          return (xq =
            a._emscripten_bind_b2PrismaticJointDef_get_localAnchorA_0 =
              a.asm.oo).apply(null, arguments);
        }),
      yq = (a._emscripten_bind_b2PrismaticJointDef_set_localAnchorA_1 =
        function () {
          return (yq =
            a._emscripten_bind_b2PrismaticJointDef_set_localAnchorA_1 =
              a.asm.po).apply(null, arguments);
        }),
      zq = (a._emscripten_bind_b2PrismaticJointDef_get_localAnchorB_0 =
        function () {
          return (zq =
            a._emscripten_bind_b2PrismaticJointDef_get_localAnchorB_0 =
              a.asm.qo).apply(null, arguments);
        }),
      Aq = (a._emscripten_bind_b2PrismaticJointDef_set_localAnchorB_1 =
        function () {
          return (Aq =
            a._emscripten_bind_b2PrismaticJointDef_set_localAnchorB_1 =
              a.asm.ro).apply(null, arguments);
        }),
      Bq = (a._emscripten_bind_b2PrismaticJointDef_get_localAxisA_0 =
        function () {
          return (Bq = a._emscripten_bind_b2PrismaticJointDef_get_localAxisA_0 =
            a.asm.so).apply(null, arguments);
        }),
      Cq = (a._emscripten_bind_b2PrismaticJointDef_set_localAxisA_1 =
        function () {
          return (Cq = a._emscripten_bind_b2PrismaticJointDef_set_localAxisA_1 =
            a.asm.to).apply(null, arguments);
        }),
      Dq = (a._emscripten_bind_b2PrismaticJointDef_get_referenceAngle_0 =
        function () {
          return (Dq =
            a._emscripten_bind_b2PrismaticJointDef_get_referenceAngle_0 =
              a.asm.uo).apply(null, arguments);
        }),
      Eq = (a._emscripten_bind_b2PrismaticJointDef_set_referenceAngle_1 =
        function () {
          return (Eq =
            a._emscripten_bind_b2PrismaticJointDef_set_referenceAngle_1 =
              a.asm.vo).apply(null, arguments);
        }),
      Fq = (a._emscripten_bind_b2PrismaticJointDef_get_enableLimit_0 =
        function () {
          return (Fq =
            a._emscripten_bind_b2PrismaticJointDef_get_enableLimit_0 =
              a.asm.wo).apply(null, arguments);
        }),
      Gq = (a._emscripten_bind_b2PrismaticJointDef_set_enableLimit_1 =
        function () {
          return (Gq =
            a._emscripten_bind_b2PrismaticJointDef_set_enableLimit_1 =
              a.asm.xo).apply(null, arguments);
        }),
      Hq = (a._emscripten_bind_b2PrismaticJointDef_get_lowerTranslation_0 =
        function () {
          return (Hq =
            a._emscripten_bind_b2PrismaticJointDef_get_lowerTranslation_0 =
              a.asm.yo).apply(null, arguments);
        }),
      Iq = (a._emscripten_bind_b2PrismaticJointDef_set_lowerTranslation_1 =
        function () {
          return (Iq =
            a._emscripten_bind_b2PrismaticJointDef_set_lowerTranslation_1 =
              a.asm.zo).apply(null, arguments);
        }),
      Jq = (a._emscripten_bind_b2PrismaticJointDef_get_upperTranslation_0 =
        function () {
          return (Jq =
            a._emscripten_bind_b2PrismaticJointDef_get_upperTranslation_0 =
              a.asm.Ao).apply(null, arguments);
        }),
      Kq = (a._emscripten_bind_b2PrismaticJointDef_set_upperTranslation_1 =
        function () {
          return (Kq =
            a._emscripten_bind_b2PrismaticJointDef_set_upperTranslation_1 =
              a.asm.Bo).apply(null, arguments);
        }),
      Lq = (a._emscripten_bind_b2PrismaticJointDef_get_enableMotor_0 =
        function () {
          return (Lq =
            a._emscripten_bind_b2PrismaticJointDef_get_enableMotor_0 =
              a.asm.Co).apply(null, arguments);
        }),
      Mq = (a._emscripten_bind_b2PrismaticJointDef_set_enableMotor_1 =
        function () {
          return (Mq =
            a._emscripten_bind_b2PrismaticJointDef_set_enableMotor_1 =
              a.asm.Do).apply(null, arguments);
        }),
      Nq = (a._emscripten_bind_b2PrismaticJointDef_get_maxMotorForce_0 =
        function () {
          return (Nq =
            a._emscripten_bind_b2PrismaticJointDef_get_maxMotorForce_0 =
              a.asm.Eo).apply(null, arguments);
        }),
      Oq = (a._emscripten_bind_b2PrismaticJointDef_set_maxMotorForce_1 =
        function () {
          return (Oq =
            a._emscripten_bind_b2PrismaticJointDef_set_maxMotorForce_1 =
              a.asm.Fo).apply(null, arguments);
        }),
      Pq = (a._emscripten_bind_b2PrismaticJointDef_get_motorSpeed_0 =
        function () {
          return (Pq = a._emscripten_bind_b2PrismaticJointDef_get_motorSpeed_0 =
            a.asm.Go).apply(null, arguments);
        }),
      Qq = (a._emscripten_bind_b2PrismaticJointDef_set_motorSpeed_1 =
        function () {
          return (Qq = a._emscripten_bind_b2PrismaticJointDef_set_motorSpeed_1 =
            a.asm.Ho).apply(null, arguments);
        }),
      Rq = (a._emscripten_bind_b2PrismaticJointDef_get_type_0 = function () {
        return (Rq = a._emscripten_bind_b2PrismaticJointDef_get_type_0 =
          a.asm.Io).apply(null, arguments);
      }),
      Sq = (a._emscripten_bind_b2PrismaticJointDef_set_type_1 = function () {
        return (Sq = a._emscripten_bind_b2PrismaticJointDef_set_type_1 =
          a.asm.Jo).apply(null, arguments);
      }),
      Tq = (a._emscripten_bind_b2PrismaticJointDef_get_userData_0 =
        function () {
          return (Tq = a._emscripten_bind_b2PrismaticJointDef_get_userData_0 =
            a.asm.Ko).apply(null, arguments);
        }),
      Uq = (a._emscripten_bind_b2PrismaticJointDef_set_userData_1 =
        function () {
          return (Uq = a._emscripten_bind_b2PrismaticJointDef_set_userData_1 =
            a.asm.Lo).apply(null, arguments);
        }),
      Vq = (a._emscripten_bind_b2PrismaticJointDef_get_bodyA_0 = function () {
        return (Vq = a._emscripten_bind_b2PrismaticJointDef_get_bodyA_0 =
          a.asm.Mo).apply(null, arguments);
      }),
      Wq = (a._emscripten_bind_b2PrismaticJointDef_set_bodyA_1 = function () {
        return (Wq = a._emscripten_bind_b2PrismaticJointDef_set_bodyA_1 =
          a.asm.No).apply(null, arguments);
      }),
      Xq = (a._emscripten_bind_b2PrismaticJointDef_get_bodyB_0 = function () {
        return (Xq = a._emscripten_bind_b2PrismaticJointDef_get_bodyB_0 =
          a.asm.Oo).apply(null, arguments);
      }),
      Yq = (a._emscripten_bind_b2PrismaticJointDef_set_bodyB_1 = function () {
        return (Yq = a._emscripten_bind_b2PrismaticJointDef_set_bodyB_1 =
          a.asm.Po).apply(null, arguments);
      }),
      Zq = (a._emscripten_bind_b2PrismaticJointDef_get_collideConnected_0 =
        function () {
          return (Zq =
            a._emscripten_bind_b2PrismaticJointDef_get_collideConnected_0 =
              a.asm.Qo).apply(null, arguments);
        }),
      $q = (a._emscripten_bind_b2PrismaticJointDef_set_collideConnected_1 =
        function () {
          return ($q =
            a._emscripten_bind_b2PrismaticJointDef_set_collideConnected_1 =
              a.asm.Ro).apply(null, arguments);
        }),
      ar = (a._emscripten_bind_b2PrismaticJointDef___destroy___0 = function () {
        return (ar = a._emscripten_bind_b2PrismaticJointDef___destroy___0 =
          a.asm.So).apply(null, arguments);
      }),
      br = (a._emscripten_bind_b2Profile_get_step_0 = function () {
        return (br = a._emscripten_bind_b2Profile_get_step_0 = a.asm.To).apply(
          null,
          arguments,
        );
      }),
      cr = (a._emscripten_bind_b2Profile_set_step_1 = function () {
        return (cr = a._emscripten_bind_b2Profile_set_step_1 = a.asm.Uo).apply(
          null,
          arguments,
        );
      }),
      dr = (a._emscripten_bind_b2Profile_get_collide_0 = function () {
        return (dr = a._emscripten_bind_b2Profile_get_collide_0 =
          a.asm.Vo).apply(null, arguments);
      }),
      er = (a._emscripten_bind_b2Profile_set_collide_1 = function () {
        return (er = a._emscripten_bind_b2Profile_set_collide_1 =
          a.asm.Wo).apply(null, arguments);
      }),
      fr = (a._emscripten_bind_b2Profile_get_solve_0 = function () {
        return (fr = a._emscripten_bind_b2Profile_get_solve_0 = a.asm.Xo).apply(
          null,
          arguments,
        );
      }),
      gr = (a._emscripten_bind_b2Profile_set_solve_1 = function () {
        return (gr = a._emscripten_bind_b2Profile_set_solve_1 = a.asm.Yo).apply(
          null,
          arguments,
        );
      }),
      hr = (a._emscripten_bind_b2Profile_get_solveInit_0 = function () {
        return (hr = a._emscripten_bind_b2Profile_get_solveInit_0 =
          a.asm.Zo).apply(null, arguments);
      }),
      ir = (a._emscripten_bind_b2Profile_set_solveInit_1 = function () {
        return (ir = a._emscripten_bind_b2Profile_set_solveInit_1 =
          a.asm._o).apply(null, arguments);
      }),
      jr = (a._emscripten_bind_b2Profile_get_solveVelocity_0 = function () {
        return (jr = a._emscripten_bind_b2Profile_get_solveVelocity_0 =
          a.asm.$o).apply(null, arguments);
      }),
      kr = (a._emscripten_bind_b2Profile_set_solveVelocity_1 = function () {
        return (kr = a._emscripten_bind_b2Profile_set_solveVelocity_1 =
          a.asm.ap).apply(null, arguments);
      }),
      lr = (a._emscripten_bind_b2Profile_get_solvePosition_0 = function () {
        return (lr = a._emscripten_bind_b2Profile_get_solvePosition_0 =
          a.asm.bp).apply(null, arguments);
      }),
      mr = (a._emscripten_bind_b2Profile_set_solvePosition_1 = function () {
        return (mr = a._emscripten_bind_b2Profile_set_solvePosition_1 =
          a.asm.cp).apply(null, arguments);
      }),
      nr = (a._emscripten_bind_b2Profile_get_broadphase_0 = function () {
        return (nr = a._emscripten_bind_b2Profile_get_broadphase_0 =
          a.asm.dp).apply(null, arguments);
      }),
      or = (a._emscripten_bind_b2Profile_set_broadphase_1 = function () {
        return (or = a._emscripten_bind_b2Profile_set_broadphase_1 =
          a.asm.ep).apply(null, arguments);
      }),
      pr = (a._emscripten_bind_b2Profile_get_solveTOI_0 = function () {
        return (pr = a._emscripten_bind_b2Profile_get_solveTOI_0 =
          a.asm.fp).apply(null, arguments);
      }),
      qr = (a._emscripten_bind_b2Profile_set_solveTOI_1 = function () {
        return (qr = a._emscripten_bind_b2Profile_set_solveTOI_1 =
          a.asm.gp).apply(null, arguments);
      }),
      rr = (a._emscripten_bind_b2Profile___destroy___0 = function () {
        return (rr = a._emscripten_bind_b2Profile___destroy___0 =
          a.asm.hp).apply(null, arguments);
      }),
      sr = (a._emscripten_bind_b2PulleyJoint_GetGroundAnchorA_0 = function () {
        return (sr = a._emscripten_bind_b2PulleyJoint_GetGroundAnchorA_0 =
          a.asm.ip).apply(null, arguments);
      }),
      tr = (a._emscripten_bind_b2PulleyJoint_GetGroundAnchorB_0 = function () {
        return (tr = a._emscripten_bind_b2PulleyJoint_GetGroundAnchorB_0 =
          a.asm.jp).apply(null, arguments);
      }),
      ur = (a._emscripten_bind_b2PulleyJoint_GetLengthA_0 = function () {
        return (ur = a._emscripten_bind_b2PulleyJoint_GetLengthA_0 =
          a.asm.kp).apply(null, arguments);
      }),
      vr = (a._emscripten_bind_b2PulleyJoint_GetLengthB_0 = function () {
        return (vr = a._emscripten_bind_b2PulleyJoint_GetLengthB_0 =
          a.asm.lp).apply(null, arguments);
      }),
      wr = (a._emscripten_bind_b2PulleyJoint_GetRatio_0 = function () {
        return (wr = a._emscripten_bind_b2PulleyJoint_GetRatio_0 =
          a.asm.mp).apply(null, arguments);
      }),
      xr = (a._emscripten_bind_b2PulleyJoint_GetCurrentLengthA_0 = function () {
        return (xr = a._emscripten_bind_b2PulleyJoint_GetCurrentLengthA_0 =
          a.asm.np).apply(null, arguments);
      }),
      yr = (a._emscripten_bind_b2PulleyJoint_GetCurrentLengthB_0 = function () {
        return (yr = a._emscripten_bind_b2PulleyJoint_GetCurrentLengthB_0 =
          a.asm.op).apply(null, arguments);
      }),
      zr = (a._emscripten_bind_b2PulleyJoint_GetType_0 = function () {
        return (zr = a._emscripten_bind_b2PulleyJoint_GetType_0 =
          a.asm.pp).apply(null, arguments);
      }),
      Ar = (a._emscripten_bind_b2PulleyJoint_GetBodyA_0 = function () {
        return (Ar = a._emscripten_bind_b2PulleyJoint_GetBodyA_0 =
          a.asm.qp).apply(null, arguments);
      }),
      Br = (a._emscripten_bind_b2PulleyJoint_GetBodyB_0 = function () {
        return (Br = a._emscripten_bind_b2PulleyJoint_GetBodyB_0 =
          a.asm.rp).apply(null, arguments);
      }),
      Cr = (a._emscripten_bind_b2PulleyJoint_GetAnchorA_0 = function () {
        return (Cr = a._emscripten_bind_b2PulleyJoint_GetAnchorA_0 =
          a.asm.sp).apply(null, arguments);
      }),
      Dr = (a._emscripten_bind_b2PulleyJoint_GetAnchorB_0 = function () {
        return (Dr = a._emscripten_bind_b2PulleyJoint_GetAnchorB_0 =
          a.asm.tp).apply(null, arguments);
      }),
      Er = (a._emscripten_bind_b2PulleyJoint_GetReactionForce_1 = function () {
        return (Er = a._emscripten_bind_b2PulleyJoint_GetReactionForce_1 =
          a.asm.up).apply(null, arguments);
      }),
      Fr = (a._emscripten_bind_b2PulleyJoint_GetReactionTorque_1 = function () {
        return (Fr = a._emscripten_bind_b2PulleyJoint_GetReactionTorque_1 =
          a.asm.vp).apply(null, arguments);
      }),
      Gr = (a._emscripten_bind_b2PulleyJoint_GetNext_0 = function () {
        return (Gr = a._emscripten_bind_b2PulleyJoint_GetNext_0 =
          a.asm.wp).apply(null, arguments);
      }),
      Hr = (a._emscripten_bind_b2PulleyJoint_GetUserData_0 = function () {
        return (Hr = a._emscripten_bind_b2PulleyJoint_GetUserData_0 =
          a.asm.xp).apply(null, arguments);
      }),
      Ir = (a._emscripten_bind_b2PulleyJoint_GetCollideConnected_0 =
        function () {
          return (Ir = a._emscripten_bind_b2PulleyJoint_GetCollideConnected_0 =
            a.asm.yp).apply(null, arguments);
        }),
      Jr = (a._emscripten_bind_b2PulleyJoint___destroy___0 = function () {
        return (Jr = a._emscripten_bind_b2PulleyJoint___destroy___0 =
          a.asm.zp).apply(null, arguments);
      }),
      Kr = (a._emscripten_bind_b2PulleyJointDef_b2PulleyJointDef_0 =
        function () {
          return (Kr = a._emscripten_bind_b2PulleyJointDef_b2PulleyJointDef_0 =
            a.asm.Ap).apply(null, arguments);
        }),
      Lr = (a._emscripten_bind_b2PulleyJointDef_Initialize_7 = function () {
        return (Lr = a._emscripten_bind_b2PulleyJointDef_Initialize_7 =
          a.asm.Bp).apply(null, arguments);
      }),
      Mr = (a._emscripten_bind_b2PulleyJointDef_get_groundAnchorA_0 =
        function () {
          return (Mr = a._emscripten_bind_b2PulleyJointDef_get_groundAnchorA_0 =
            a.asm.Cp).apply(null, arguments);
        }),
      Nr = (a._emscripten_bind_b2PulleyJointDef_set_groundAnchorA_1 =
        function () {
          return (Nr = a._emscripten_bind_b2PulleyJointDef_set_groundAnchorA_1 =
            a.asm.Dp).apply(null, arguments);
        }),
      Or = (a._emscripten_bind_b2PulleyJointDef_get_groundAnchorB_0 =
        function () {
          return (Or = a._emscripten_bind_b2PulleyJointDef_get_groundAnchorB_0 =
            a.asm.Ep).apply(null, arguments);
        }),
      Pr = (a._emscripten_bind_b2PulleyJointDef_set_groundAnchorB_1 =
        function () {
          return (Pr = a._emscripten_bind_b2PulleyJointDef_set_groundAnchorB_1 =
            a.asm.Fp).apply(null, arguments);
        }),
      Qr = (a._emscripten_bind_b2PulleyJointDef_get_localAnchorA_0 =
        function () {
          return (Qr = a._emscripten_bind_b2PulleyJointDef_get_localAnchorA_0 =
            a.asm.Gp).apply(null, arguments);
        }),
      Rr = (a._emscripten_bind_b2PulleyJointDef_set_localAnchorA_1 =
        function () {
          return (Rr = a._emscripten_bind_b2PulleyJointDef_set_localAnchorA_1 =
            a.asm.Hp).apply(null, arguments);
        }),
      Sr = (a._emscripten_bind_b2PulleyJointDef_get_localAnchorB_0 =
        function () {
          return (Sr = a._emscripten_bind_b2PulleyJointDef_get_localAnchorB_0 =
            a.asm.Ip).apply(null, arguments);
        }),
      Tr = (a._emscripten_bind_b2PulleyJointDef_set_localAnchorB_1 =
        function () {
          return (Tr = a._emscripten_bind_b2PulleyJointDef_set_localAnchorB_1 =
            a.asm.Jp).apply(null, arguments);
        }),
      Ur = (a._emscripten_bind_b2PulleyJointDef_get_lengthA_0 = function () {
        return (Ur = a._emscripten_bind_b2PulleyJointDef_get_lengthA_0 =
          a.asm.Kp).apply(null, arguments);
      }),
      Vr = (a._emscripten_bind_b2PulleyJointDef_set_lengthA_1 = function () {
        return (Vr = a._emscripten_bind_b2PulleyJointDef_set_lengthA_1 =
          a.asm.Lp).apply(null, arguments);
      }),
      Wr = (a._emscripten_bind_b2PulleyJointDef_get_lengthB_0 = function () {
        return (Wr = a._emscripten_bind_b2PulleyJointDef_get_lengthB_0 =
          a.asm.Mp).apply(null, arguments);
      }),
      Xr = (a._emscripten_bind_b2PulleyJointDef_set_lengthB_1 = function () {
        return (Xr = a._emscripten_bind_b2PulleyJointDef_set_lengthB_1 =
          a.asm.Np).apply(null, arguments);
      }),
      Yr = (a._emscripten_bind_b2PulleyJointDef_get_ratio_0 = function () {
        return (Yr = a._emscripten_bind_b2PulleyJointDef_get_ratio_0 =
          a.asm.Op).apply(null, arguments);
      }),
      Zr = (a._emscripten_bind_b2PulleyJointDef_set_ratio_1 = function () {
        return (Zr = a._emscripten_bind_b2PulleyJointDef_set_ratio_1 =
          a.asm.Pp).apply(null, arguments);
      }),
      $r = (a._emscripten_bind_b2PulleyJointDef_get_type_0 = function () {
        return ($r = a._emscripten_bind_b2PulleyJointDef_get_type_0 =
          a.asm.Qp).apply(null, arguments);
      }),
      as = (a._emscripten_bind_b2PulleyJointDef_set_type_1 = function () {
        return (as = a._emscripten_bind_b2PulleyJointDef_set_type_1 =
          a.asm.Rp).apply(null, arguments);
      }),
      bs = (a._emscripten_bind_b2PulleyJointDef_get_userData_0 = function () {
        return (bs = a._emscripten_bind_b2PulleyJointDef_get_userData_0 =
          a.asm.Sp).apply(null, arguments);
      }),
      cs = (a._emscripten_bind_b2PulleyJointDef_set_userData_1 = function () {
        return (cs = a._emscripten_bind_b2PulleyJointDef_set_userData_1 =
          a.asm.Tp).apply(null, arguments);
      }),
      ds = (a._emscripten_bind_b2PulleyJointDef_get_bodyA_0 = function () {
        return (ds = a._emscripten_bind_b2PulleyJointDef_get_bodyA_0 =
          a.asm.Up).apply(null, arguments);
      }),
      es = (a._emscripten_bind_b2PulleyJointDef_set_bodyA_1 = function () {
        return (es = a._emscripten_bind_b2PulleyJointDef_set_bodyA_1 =
          a.asm.Vp).apply(null, arguments);
      }),
      gs = (a._emscripten_bind_b2PulleyJointDef_get_bodyB_0 = function () {
        return (gs = a._emscripten_bind_b2PulleyJointDef_get_bodyB_0 =
          a.asm.Wp).apply(null, arguments);
      }),
      hs = (a._emscripten_bind_b2PulleyJointDef_set_bodyB_1 = function () {
        return (hs = a._emscripten_bind_b2PulleyJointDef_set_bodyB_1 =
          a.asm.Xp).apply(null, arguments);
      }),
      is = (a._emscripten_bind_b2PulleyJointDef_get_collideConnected_0 =
        function () {
          return (is =
            a._emscripten_bind_b2PulleyJointDef_get_collideConnected_0 =
              a.asm.Yp).apply(null, arguments);
        }),
      js = (a._emscripten_bind_b2PulleyJointDef_set_collideConnected_1 =
        function () {
          return (js =
            a._emscripten_bind_b2PulleyJointDef_set_collideConnected_1 =
              a.asm.Zp).apply(null, arguments);
        }),
      ks = (a._emscripten_bind_b2PulleyJointDef___destroy___0 = function () {
        return (ks = a._emscripten_bind_b2PulleyJointDef___destroy___0 =
          a.asm._p).apply(null, arguments);
      }),
      ls = (a._emscripten_bind_b2RayCastInput_get_p1_0 = function () {
        return (ls = a._emscripten_bind_b2RayCastInput_get_p1_0 =
          a.asm.$p).apply(null, arguments);
      }),
      ms = (a._emscripten_bind_b2RayCastInput_set_p1_1 = function () {
        return (ms = a._emscripten_bind_b2RayCastInput_set_p1_1 =
          a.asm.aq).apply(null, arguments);
      }),
      ns = (a._emscripten_bind_b2RayCastInput_get_p2_0 = function () {
        return (ns = a._emscripten_bind_b2RayCastInput_get_p2_0 =
          a.asm.bq).apply(null, arguments);
      }),
      ps = (a._emscripten_bind_b2RayCastInput_set_p2_1 = function () {
        return (ps = a._emscripten_bind_b2RayCastInput_set_p2_1 =
          a.asm.cq).apply(null, arguments);
      }),
      qs = (a._emscripten_bind_b2RayCastInput_get_maxFraction_0 = function () {
        return (qs = a._emscripten_bind_b2RayCastInput_get_maxFraction_0 =
          a.asm.dq).apply(null, arguments);
      }),
      rs = (a._emscripten_bind_b2RayCastInput_set_maxFraction_1 = function () {
        return (rs = a._emscripten_bind_b2RayCastInput_set_maxFraction_1 =
          a.asm.eq).apply(null, arguments);
      }),
      ss = (a._emscripten_bind_b2RayCastInput___destroy___0 = function () {
        return (ss = a._emscripten_bind_b2RayCastInput___destroy___0 =
          a.asm.fq).apply(null, arguments);
      }),
      ts = (a._emscripten_bind_b2RayCastOutput_get_normal_0 = function () {
        return (ts = a._emscripten_bind_b2RayCastOutput_get_normal_0 =
          a.asm.gq).apply(null, arguments);
      }),
      us = (a._emscripten_bind_b2RayCastOutput_set_normal_1 = function () {
        return (us = a._emscripten_bind_b2RayCastOutput_set_normal_1 =
          a.asm.hq).apply(null, arguments);
      }),
      vs = (a._emscripten_bind_b2RayCastOutput_get_fraction_0 = function () {
        return (vs = a._emscripten_bind_b2RayCastOutput_get_fraction_0 =
          a.asm.iq).apply(null, arguments);
      }),
      xs = (a._emscripten_bind_b2RayCastOutput_set_fraction_1 = function () {
        return (xs = a._emscripten_bind_b2RayCastOutput_set_fraction_1 =
          a.asm.jq).apply(null, arguments);
      }),
      ys = (a._emscripten_bind_b2RayCastOutput___destroy___0 = function () {
        return (ys = a._emscripten_bind_b2RayCastOutput___destroy___0 =
          a.asm.kq).apply(null, arguments);
      }),
      zs = (a._emscripten_bind_b2RevoluteJoint_GetLocalAnchorA_0 = function () {
        return (zs = a._emscripten_bind_b2RevoluteJoint_GetLocalAnchorA_0 =
          a.asm.lq).apply(null, arguments);
      }),
      As = (a._emscripten_bind_b2RevoluteJoint_GetLocalAnchorB_0 = function () {
        return (As = a._emscripten_bind_b2RevoluteJoint_GetLocalAnchorB_0 =
          a.asm.mq).apply(null, arguments);
      }),
      Bs = (a._emscripten_bind_b2RevoluteJoint_GetReferenceAngle_0 =
        function () {
          return (Bs = a._emscripten_bind_b2RevoluteJoint_GetReferenceAngle_0 =
            a.asm.nq).apply(null, arguments);
        }),
      Cs = (a._emscripten_bind_b2RevoluteJoint_GetJointAngle_0 = function () {
        return (Cs = a._emscripten_bind_b2RevoluteJoint_GetJointAngle_0 =
          a.asm.oq).apply(null, arguments);
      }),
      Ds = (a._emscripten_bind_b2RevoluteJoint_GetJointSpeed_0 = function () {
        return (Ds = a._emscripten_bind_b2RevoluteJoint_GetJointSpeed_0 =
          a.asm.pq).apply(null, arguments);
      }),
      Es = (a._emscripten_bind_b2RevoluteJoint_IsLimitEnabled_0 = function () {
        return (Es = a._emscripten_bind_b2RevoluteJoint_IsLimitEnabled_0 =
          a.asm.qq).apply(null, arguments);
      }),
      Fs = (a._emscripten_bind_b2RevoluteJoint_EnableLimit_1 = function () {
        return (Fs = a._emscripten_bind_b2RevoluteJoint_EnableLimit_1 =
          a.asm.rq).apply(null, arguments);
      }),
      Gs = (a._emscripten_bind_b2RevoluteJoint_GetLowerLimit_0 = function () {
        return (Gs = a._emscripten_bind_b2RevoluteJoint_GetLowerLimit_0 =
          a.asm.sq).apply(null, arguments);
      }),
      Hs = (a._emscripten_bind_b2RevoluteJoint_GetUpperLimit_0 = function () {
        return (Hs = a._emscripten_bind_b2RevoluteJoint_GetUpperLimit_0 =
          a.asm.tq).apply(null, arguments);
      }),
      Is = (a._emscripten_bind_b2RevoluteJoint_SetLimits_2 = function () {
        return (Is = a._emscripten_bind_b2RevoluteJoint_SetLimits_2 =
          a.asm.uq).apply(null, arguments);
      }),
      Js = (a._emscripten_bind_b2RevoluteJoint_IsMotorEnabled_0 = function () {
        return (Js = a._emscripten_bind_b2RevoluteJoint_IsMotorEnabled_0 =
          a.asm.vq).apply(null, arguments);
      }),
      Ks = (a._emscripten_bind_b2RevoluteJoint_EnableMotor_1 = function () {
        return (Ks = a._emscripten_bind_b2RevoluteJoint_EnableMotor_1 =
          a.asm.wq).apply(null, arguments);
      }),
      Ls = (a._emscripten_bind_b2RevoluteJoint_SetMotorSpeed_1 = function () {
        return (Ls = a._emscripten_bind_b2RevoluteJoint_SetMotorSpeed_1 =
          a.asm.xq).apply(null, arguments);
      }),
      Ms = (a._emscripten_bind_b2RevoluteJoint_GetMotorSpeed_0 = function () {
        return (Ms = a._emscripten_bind_b2RevoluteJoint_GetMotorSpeed_0 =
          a.asm.yq).apply(null, arguments);
      }),
      Ns = (a._emscripten_bind_b2RevoluteJoint_SetMaxMotorTorque_1 =
        function () {
          return (Ns = a._emscripten_bind_b2RevoluteJoint_SetMaxMotorTorque_1 =
            a.asm.zq).apply(null, arguments);
        }),
      Os = (a._emscripten_bind_b2RevoluteJoint_GetMaxMotorTorque_0 =
        function () {
          return (Os = a._emscripten_bind_b2RevoluteJoint_GetMaxMotorTorque_0 =
            a.asm.Aq).apply(null, arguments);
        }),
      Ps = (a._emscripten_bind_b2RevoluteJoint_GetMotorTorque_1 = function () {
        return (Ps = a._emscripten_bind_b2RevoluteJoint_GetMotorTorque_1 =
          a.asm.Bq).apply(null, arguments);
      }),
      Qs = (a._emscripten_bind_b2RevoluteJoint_GetType_0 = function () {
        return (Qs = a._emscripten_bind_b2RevoluteJoint_GetType_0 =
          a.asm.Cq).apply(null, arguments);
      }),
      Rs = (a._emscripten_bind_b2RevoluteJoint_GetBodyA_0 = function () {
        return (Rs = a._emscripten_bind_b2RevoluteJoint_GetBodyA_0 =
          a.asm.Dq).apply(null, arguments);
      }),
      Ss = (a._emscripten_bind_b2RevoluteJoint_GetBodyB_0 = function () {
        return (Ss = a._emscripten_bind_b2RevoluteJoint_GetBodyB_0 =
          a.asm.Eq).apply(null, arguments);
      }),
      Ts = (a._emscripten_bind_b2RevoluteJoint_GetAnchorA_0 = function () {
        return (Ts = a._emscripten_bind_b2RevoluteJoint_GetAnchorA_0 =
          a.asm.Fq).apply(null, arguments);
      }),
      Us = (a._emscripten_bind_b2RevoluteJoint_GetAnchorB_0 = function () {
        return (Us = a._emscripten_bind_b2RevoluteJoint_GetAnchorB_0 =
          a.asm.Gq).apply(null, arguments);
      }),
      Vs = (a._emscripten_bind_b2RevoluteJoint_GetReactionForce_1 =
        function () {
          return (Vs = a._emscripten_bind_b2RevoluteJoint_GetReactionForce_1 =
            a.asm.Hq).apply(null, arguments);
        }),
      Ws = (a._emscripten_bind_b2RevoluteJoint_GetReactionTorque_1 =
        function () {
          return (Ws = a._emscripten_bind_b2RevoluteJoint_GetReactionTorque_1 =
            a.asm.Iq).apply(null, arguments);
        }),
      Xs = (a._emscripten_bind_b2RevoluteJoint_GetNext_0 = function () {
        return (Xs = a._emscripten_bind_b2RevoluteJoint_GetNext_0 =
          a.asm.Jq).apply(null, arguments);
      }),
      Ys = (a._emscripten_bind_b2RevoluteJoint_GetUserData_0 = function () {
        return (Ys = a._emscripten_bind_b2RevoluteJoint_GetUserData_0 =
          a.asm.Kq).apply(null, arguments);
      }),
      Zs = (a._emscripten_bind_b2RevoluteJoint_GetCollideConnected_0 =
        function () {
          return (Zs =
            a._emscripten_bind_b2RevoluteJoint_GetCollideConnected_0 =
              a.asm.Lq).apply(null, arguments);
        }),
      $s = (a._emscripten_bind_b2RevoluteJoint___destroy___0 = function () {
        return ($s = a._emscripten_bind_b2RevoluteJoint___destroy___0 =
          a.asm.Mq).apply(null, arguments);
      }),
      at = (a._emscripten_bind_b2RevoluteJointDef_b2RevoluteJointDef_0 =
        function () {
          return (at =
            a._emscripten_bind_b2RevoluteJointDef_b2RevoluteJointDef_0 =
              a.asm.Nq).apply(null, arguments);
        }),
      bt = (a._emscripten_bind_b2RevoluteJointDef_Initialize_3 = function () {
        return (bt = a._emscripten_bind_b2RevoluteJointDef_Initialize_3 =
          a.asm.Oq).apply(null, arguments);
      }),
      ct = (a._emscripten_bind_b2RevoluteJointDef_get_localAnchorA_0 =
        function () {
          return (ct =
            a._emscripten_bind_b2RevoluteJointDef_get_localAnchorA_0 =
              a.asm.Pq).apply(null, arguments);
        }),
      dt = (a._emscripten_bind_b2RevoluteJointDef_set_localAnchorA_1 =
        function () {
          return (dt =
            a._emscripten_bind_b2RevoluteJointDef_set_localAnchorA_1 =
              a.asm.Qq).apply(null, arguments);
        }),
      et = (a._emscripten_bind_b2RevoluteJointDef_get_localAnchorB_0 =
        function () {
          return (et =
            a._emscripten_bind_b2RevoluteJointDef_get_localAnchorB_0 =
              a.asm.Rq).apply(null, arguments);
        }),
      ft = (a._emscripten_bind_b2RevoluteJointDef_set_localAnchorB_1 =
        function () {
          return (ft =
            a._emscripten_bind_b2RevoluteJointDef_set_localAnchorB_1 =
              a.asm.Sq).apply(null, arguments);
        }),
      gt = (a._emscripten_bind_b2RevoluteJointDef_get_referenceAngle_0 =
        function () {
          return (gt =
            a._emscripten_bind_b2RevoluteJointDef_get_referenceAngle_0 =
              a.asm.Tq).apply(null, arguments);
        }),
      ht = (a._emscripten_bind_b2RevoluteJointDef_set_referenceAngle_1 =
        function () {
          return (ht =
            a._emscripten_bind_b2RevoluteJointDef_set_referenceAngle_1 =
              a.asm.Uq).apply(null, arguments);
        }),
      it = (a._emscripten_bind_b2RevoluteJointDef_get_enableLimit_0 =
        function () {
          return (it = a._emscripten_bind_b2RevoluteJointDef_get_enableLimit_0 =
            a.asm.Vq).apply(null, arguments);
        }),
      jt = (a._emscripten_bind_b2RevoluteJointDef_set_enableLimit_1 =
        function () {
          return (jt = a._emscripten_bind_b2RevoluteJointDef_set_enableLimit_1 =
            a.asm.Wq).apply(null, arguments);
        }),
      kt = (a._emscripten_bind_b2RevoluteJointDef_get_lowerAngle_0 =
        function () {
          return (kt = a._emscripten_bind_b2RevoluteJointDef_get_lowerAngle_0 =
            a.asm.Xq).apply(null, arguments);
        }),
      lt = (a._emscripten_bind_b2RevoluteJointDef_set_lowerAngle_1 =
        function () {
          return (lt = a._emscripten_bind_b2RevoluteJointDef_set_lowerAngle_1 =
            a.asm.Yq).apply(null, arguments);
        }),
      mt = (a._emscripten_bind_b2RevoluteJointDef_get_upperAngle_0 =
        function () {
          return (mt = a._emscripten_bind_b2RevoluteJointDef_get_upperAngle_0 =
            a.asm.Zq).apply(null, arguments);
        }),
      nt = (a._emscripten_bind_b2RevoluteJointDef_set_upperAngle_1 =
        function () {
          return (nt = a._emscripten_bind_b2RevoluteJointDef_set_upperAngle_1 =
            a.asm._q).apply(null, arguments);
        }),
      ot = (a._emscripten_bind_b2RevoluteJointDef_get_enableMotor_0 =
        function () {
          return (ot = a._emscripten_bind_b2RevoluteJointDef_get_enableMotor_0 =
            a.asm.$q).apply(null, arguments);
        }),
      pt = (a._emscripten_bind_b2RevoluteJointDef_set_enableMotor_1 =
        function () {
          return (pt = a._emscripten_bind_b2RevoluteJointDef_set_enableMotor_1 =
            a.asm.ar).apply(null, arguments);
        }),
      qt = (a._emscripten_bind_b2RevoluteJointDef_get_motorSpeed_0 =
        function () {
          return (qt = a._emscripten_bind_b2RevoluteJointDef_get_motorSpeed_0 =
            a.asm.br).apply(null, arguments);
        }),
      rt = (a._emscripten_bind_b2RevoluteJointDef_set_motorSpeed_1 =
        function () {
          return (rt = a._emscripten_bind_b2RevoluteJointDef_set_motorSpeed_1 =
            a.asm.cr).apply(null, arguments);
        }),
      st = (a._emscripten_bind_b2RevoluteJointDef_get_maxMotorTorque_0 =
        function () {
          return (st =
            a._emscripten_bind_b2RevoluteJointDef_get_maxMotorTorque_0 =
              a.asm.dr).apply(null, arguments);
        }),
      tt = (a._emscripten_bind_b2RevoluteJointDef_set_maxMotorTorque_1 =
        function () {
          return (tt =
            a._emscripten_bind_b2RevoluteJointDef_set_maxMotorTorque_1 =
              a.asm.er).apply(null, arguments);
        }),
      ut = (a._emscripten_bind_b2RevoluteJointDef_get_type_0 = function () {
        return (ut = a._emscripten_bind_b2RevoluteJointDef_get_type_0 =
          a.asm.fr).apply(null, arguments);
      }),
      vt = (a._emscripten_bind_b2RevoluteJointDef_set_type_1 = function () {
        return (vt = a._emscripten_bind_b2RevoluteJointDef_set_type_1 =
          a.asm.gr).apply(null, arguments);
      }),
      wt = (a._emscripten_bind_b2RevoluteJointDef_get_userData_0 = function () {
        return (wt = a._emscripten_bind_b2RevoluteJointDef_get_userData_0 =
          a.asm.hr).apply(null, arguments);
      }),
      xt = (a._emscripten_bind_b2RevoluteJointDef_set_userData_1 = function () {
        return (xt = a._emscripten_bind_b2RevoluteJointDef_set_userData_1 =
          a.asm.ir).apply(null, arguments);
      }),
      yt = (a._emscripten_bind_b2RevoluteJointDef_get_bodyA_0 = function () {
        return (yt = a._emscripten_bind_b2RevoluteJointDef_get_bodyA_0 =
          a.asm.jr).apply(null, arguments);
      }),
      zt = (a._emscripten_bind_b2RevoluteJointDef_set_bodyA_1 = function () {
        return (zt = a._emscripten_bind_b2RevoluteJointDef_set_bodyA_1 =
          a.asm.kr).apply(null, arguments);
      }),
      At = (a._emscripten_bind_b2RevoluteJointDef_get_bodyB_0 = function () {
        return (At = a._emscripten_bind_b2RevoluteJointDef_get_bodyB_0 =
          a.asm.lr).apply(null, arguments);
      }),
      Bt = (a._emscripten_bind_b2RevoluteJointDef_set_bodyB_1 = function () {
        return (Bt = a._emscripten_bind_b2RevoluteJointDef_set_bodyB_1 =
          a.asm.mr).apply(null, arguments);
      }),
      Ct = (a._emscripten_bind_b2RevoluteJointDef_get_collideConnected_0 =
        function () {
          return (Ct =
            a._emscripten_bind_b2RevoluteJointDef_get_collideConnected_0 =
              a.asm.nr).apply(null, arguments);
        }),
      Dt = (a._emscripten_bind_b2RevoluteJointDef_set_collideConnected_1 =
        function () {
          return (Dt =
            a._emscripten_bind_b2RevoluteJointDef_set_collideConnected_1 =
              a.asm.or).apply(null, arguments);
        }),
      Et = (a._emscripten_bind_b2RevoluteJointDef___destroy___0 = function () {
        return (Et = a._emscripten_bind_b2RevoluteJointDef___destroy___0 =
          a.asm.pr).apply(null, arguments);
      }),
      Ft = (a._emscripten_bind_b2Rot_b2Rot_0 = function () {
        return (Ft = a._emscripten_bind_b2Rot_b2Rot_0 = a.asm.qr).apply(
          null,
          arguments,
        );
      }),
      Gt = (a._emscripten_bind_b2Rot_b2Rot_1 = function () {
        return (Gt = a._emscripten_bind_b2Rot_b2Rot_1 = a.asm.rr).apply(
          null,
          arguments,
        );
      }),
      Ht = (a._emscripten_bind_b2Rot_Set_1 = function () {
        return (Ht = a._emscripten_bind_b2Rot_Set_1 = a.asm.sr).apply(
          null,
          arguments,
        );
      }),
      It = (a._emscripten_bind_b2Rot_SetIdentity_0 = function () {
        return (It = a._emscripten_bind_b2Rot_SetIdentity_0 = a.asm.tr).apply(
          null,
          arguments,
        );
      }),
      Jt = (a._emscripten_bind_b2Rot_GetAngle_0 = function () {
        return (Jt = a._emscripten_bind_b2Rot_GetAngle_0 = a.asm.ur).apply(
          null,
          arguments,
        );
      }),
      Kt = (a._emscripten_bind_b2Rot_GetXAxis_0 = function () {
        return (Kt = a._emscripten_bind_b2Rot_GetXAxis_0 = a.asm.vr).apply(
          null,
          arguments,
        );
      }),
      Lt = (a._emscripten_bind_b2Rot_GetYAxis_0 = function () {
        return (Lt = a._emscripten_bind_b2Rot_GetYAxis_0 = a.asm.wr).apply(
          null,
          arguments,
        );
      }),
      Mt = (a._emscripten_bind_b2Rot_get_s_0 = function () {
        return (Mt = a._emscripten_bind_b2Rot_get_s_0 = a.asm.xr).apply(
          null,
          arguments,
        );
      }),
      Nt = (a._emscripten_bind_b2Rot_set_s_1 = function () {
        return (Nt = a._emscripten_bind_b2Rot_set_s_1 = a.asm.yr).apply(
          null,
          arguments,
        );
      }),
      Ot = (a._emscripten_bind_b2Rot_get_c_0 = function () {
        return (Ot = a._emscripten_bind_b2Rot_get_c_0 = a.asm.zr).apply(
          null,
          arguments,
        );
      }),
      Pt = (a._emscripten_bind_b2Rot_set_c_1 = function () {
        return (Pt = a._emscripten_bind_b2Rot_set_c_1 = a.asm.Ar).apply(
          null,
          arguments,
        );
      }),
      Qt = (a._emscripten_bind_b2Rot___destroy___0 = function () {
        return (Qt = a._emscripten_bind_b2Rot___destroy___0 = a.asm.Br).apply(
          null,
          arguments,
        );
      }),
      Rt = (a._emscripten_bind_b2WheelJoint_GetLocalAnchorA_0 = function () {
        return (Rt = a._emscripten_bind_b2WheelJoint_GetLocalAnchorA_0 =
          a.asm.Cr).apply(null, arguments);
      }),
      St = (a._emscripten_bind_b2WheelJoint_GetLocalAnchorB_0 = function () {
        return (St = a._emscripten_bind_b2WheelJoint_GetLocalAnchorB_0 =
          a.asm.Dr).apply(null, arguments);
      }),
      Tt = (a._emscripten_bind_b2WheelJoint_GetLocalAxisA_0 = function () {
        return (Tt = a._emscripten_bind_b2WheelJoint_GetLocalAxisA_0 =
          a.asm.Er).apply(null, arguments);
      }),
      Ut = (a._emscripten_bind_b2WheelJoint_GetJointTranslation_0 =
        function () {
          return (Ut = a._emscripten_bind_b2WheelJoint_GetJointTranslation_0 =
            a.asm.Fr).apply(null, arguments);
        }),
      Vt = (a._emscripten_bind_b2WheelJoint_GetJointLinearSpeed_0 =
        function () {
          return (Vt = a._emscripten_bind_b2WheelJoint_GetJointLinearSpeed_0 =
            a.asm.Gr).apply(null, arguments);
        }),
      Wt = (a._emscripten_bind_b2WheelJoint_GetJointAngle_0 = function () {
        return (Wt = a._emscripten_bind_b2WheelJoint_GetJointAngle_0 =
          a.asm.Hr).apply(null, arguments);
      }),
      Xt = (a._emscripten_bind_b2WheelJoint_GetJointAngularSpeed_0 =
        function () {
          return (Xt = a._emscripten_bind_b2WheelJoint_GetJointAngularSpeed_0 =
            a.asm.Ir).apply(null, arguments);
        }),
      Yt = (a._emscripten_bind_b2WheelJoint_IsLimitEnabled_0 = function () {
        return (Yt = a._emscripten_bind_b2WheelJoint_IsLimitEnabled_0 =
          a.asm.Jr).apply(null, arguments);
      }),
      Zt = (a._emscripten_bind_b2WheelJoint_EnableLimit_1 = function () {
        return (Zt = a._emscripten_bind_b2WheelJoint_EnableLimit_1 =
          a.asm.Kr).apply(null, arguments);
      }),
      $t = (a._emscripten_bind_b2WheelJoint_GetLowerLimit_0 = function () {
        return ($t = a._emscripten_bind_b2WheelJoint_GetLowerLimit_0 =
          a.asm.Lr).apply(null, arguments);
      }),
      au = (a._emscripten_bind_b2WheelJoint_GetUpperLimit_0 = function () {
        return (au = a._emscripten_bind_b2WheelJoint_GetUpperLimit_0 =
          a.asm.Mr).apply(null, arguments);
      }),
      bu = (a._emscripten_bind_b2WheelJoint_SetLimits_2 = function () {
        return (bu = a._emscripten_bind_b2WheelJoint_SetLimits_2 =
          a.asm.Nr).apply(null, arguments);
      }),
      cu = (a._emscripten_bind_b2WheelJoint_IsMotorEnabled_0 = function () {
        return (cu = a._emscripten_bind_b2WheelJoint_IsMotorEnabled_0 =
          a.asm.Or).apply(null, arguments);
      }),
      du = (a._emscripten_bind_b2WheelJoint_EnableMotor_1 = function () {
        return (du = a._emscripten_bind_b2WheelJoint_EnableMotor_1 =
          a.asm.Pr).apply(null, arguments);
      }),
      eu = (a._emscripten_bind_b2WheelJoint_SetMotorSpeed_1 = function () {
        return (eu = a._emscripten_bind_b2WheelJoint_SetMotorSpeed_1 =
          a.asm.Qr).apply(null, arguments);
      }),
      fu = (a._emscripten_bind_b2WheelJoint_GetMotorSpeed_0 = function () {
        return (fu = a._emscripten_bind_b2WheelJoint_GetMotorSpeed_0 =
          a.asm.Rr).apply(null, arguments);
      }),
      gu = (a._emscripten_bind_b2WheelJoint_SetMaxMotorTorque_1 = function () {
        return (gu = a._emscripten_bind_b2WheelJoint_SetMaxMotorTorque_1 =
          a.asm.Sr).apply(null, arguments);
      }),
      hu = (a._emscripten_bind_b2WheelJoint_GetMaxMotorTorque_0 = function () {
        return (hu = a._emscripten_bind_b2WheelJoint_GetMaxMotorTorque_0 =
          a.asm.Tr).apply(null, arguments);
      }),
      iu = (a._emscripten_bind_b2WheelJoint_GetMotorTorque_1 = function () {
        return (iu = a._emscripten_bind_b2WheelJoint_GetMotorTorque_1 =
          a.asm.Ur).apply(null, arguments);
      }),
      ju = (a._emscripten_bind_b2WheelJoint_SetStiffness_1 = function () {
        return (ju = a._emscripten_bind_b2WheelJoint_SetStiffness_1 =
          a.asm.Vr).apply(null, arguments);
      }),
      ku = (a._emscripten_bind_b2WheelJoint_GetStiffness_0 = function () {
        return (ku = a._emscripten_bind_b2WheelJoint_GetStiffness_0 =
          a.asm.Wr).apply(null, arguments);
      }),
      lu = (a._emscripten_bind_b2WheelJoint_SetDamping_1 = function () {
        return (lu = a._emscripten_bind_b2WheelJoint_SetDamping_1 =
          a.asm.Xr).apply(null, arguments);
      }),
      mu = (a._emscripten_bind_b2WheelJoint_GetDamping_0 = function () {
        return (mu = a._emscripten_bind_b2WheelJoint_GetDamping_0 =
          a.asm.Yr).apply(null, arguments);
      }),
      nu = (a._emscripten_bind_b2WheelJoint_GetType_0 = function () {
        return (nu = a._emscripten_bind_b2WheelJoint_GetType_0 =
          a.asm.Zr).apply(null, arguments);
      }),
      ou = (a._emscripten_bind_b2WheelJoint_GetBodyA_0 = function () {
        return (ou = a._emscripten_bind_b2WheelJoint_GetBodyA_0 =
          a.asm._r).apply(null, arguments);
      }),
      pu = (a._emscripten_bind_b2WheelJoint_GetBodyB_0 = function () {
        return (pu = a._emscripten_bind_b2WheelJoint_GetBodyB_0 =
          a.asm.$r).apply(null, arguments);
      }),
      qu = (a._emscripten_bind_b2WheelJoint_GetAnchorA_0 = function () {
        return (qu = a._emscripten_bind_b2WheelJoint_GetAnchorA_0 =
          a.asm.as).apply(null, arguments);
      }),
      ru = (a._emscripten_bind_b2WheelJoint_GetAnchorB_0 = function () {
        return (ru = a._emscripten_bind_b2WheelJoint_GetAnchorB_0 =
          a.asm.bs).apply(null, arguments);
      }),
      su = (a._emscripten_bind_b2WheelJoint_GetReactionForce_1 = function () {
        return (su = a._emscripten_bind_b2WheelJoint_GetReactionForce_1 =
          a.asm.cs).apply(null, arguments);
      }),
      tu = (a._emscripten_bind_b2WheelJoint_GetReactionTorque_1 = function () {
        return (tu = a._emscripten_bind_b2WheelJoint_GetReactionTorque_1 =
          a.asm.ds).apply(null, arguments);
      }),
      uu = (a._emscripten_bind_b2WheelJoint_GetNext_0 = function () {
        return (uu = a._emscripten_bind_b2WheelJoint_GetNext_0 =
          a.asm.es).apply(null, arguments);
      }),
      vu = (a._emscripten_bind_b2WheelJoint_GetUserData_0 = function () {
        return (vu = a._emscripten_bind_b2WheelJoint_GetUserData_0 =
          a.asm.fs).apply(null, arguments);
      }),
      wu = (a._emscripten_bind_b2WheelJoint_GetCollideConnected_0 =
        function () {
          return (wu = a._emscripten_bind_b2WheelJoint_GetCollideConnected_0 =
            a.asm.gs).apply(null, arguments);
        }),
      xu = (a._emscripten_bind_b2WheelJoint___destroy___0 = function () {
        return (xu = a._emscripten_bind_b2WheelJoint___destroy___0 =
          a.asm.hs).apply(null, arguments);
      }),
      yu = (a._emscripten_bind_b2WheelJointDef_b2WheelJointDef_0 = function () {
        return (yu = a._emscripten_bind_b2WheelJointDef_b2WheelJointDef_0 =
          a.asm.is).apply(null, arguments);
      }),
      zu = (a._emscripten_bind_b2WheelJointDef_Initialize_4 = function () {
        return (zu = a._emscripten_bind_b2WheelJointDef_Initialize_4 =
          a.asm.js).apply(null, arguments);
      }),
      Au = (a._emscripten_bind_b2WheelJointDef_get_localAnchorA_0 =
        function () {
          return (Au = a._emscripten_bind_b2WheelJointDef_get_localAnchorA_0 =
            a.asm.ks).apply(null, arguments);
        }),
      Bu = (a._emscripten_bind_b2WheelJointDef_set_localAnchorA_1 =
        function () {
          return (Bu = a._emscripten_bind_b2WheelJointDef_set_localAnchorA_1 =
            a.asm.ls).apply(null, arguments);
        }),
      Cu = (a._emscripten_bind_b2WheelJointDef_get_localAnchorB_0 =
        function () {
          return (Cu = a._emscripten_bind_b2WheelJointDef_get_localAnchorB_0 =
            a.asm.ms).apply(null, arguments);
        }),
      Du = (a._emscripten_bind_b2WheelJointDef_set_localAnchorB_1 =
        function () {
          return (Du = a._emscripten_bind_b2WheelJointDef_set_localAnchorB_1 =
            a.asm.ns).apply(null, arguments);
        }),
      Eu = (a._emscripten_bind_b2WheelJointDef_get_localAxisA_0 = function () {
        return (Eu = a._emscripten_bind_b2WheelJointDef_get_localAxisA_0 =
          a.asm.os).apply(null, arguments);
      }),
      Fu = (a._emscripten_bind_b2WheelJointDef_set_localAxisA_1 = function () {
        return (Fu = a._emscripten_bind_b2WheelJointDef_set_localAxisA_1 =
          a.asm.ps).apply(null, arguments);
      }),
      Gu = (a._emscripten_bind_b2WheelJointDef_get_enableLimit_0 = function () {
        return (Gu = a._emscripten_bind_b2WheelJointDef_get_enableLimit_0 =
          a.asm.qs).apply(null, arguments);
      }),
      Hu = (a._emscripten_bind_b2WheelJointDef_set_enableLimit_1 = function () {
        return (Hu = a._emscripten_bind_b2WheelJointDef_set_enableLimit_1 =
          a.asm.rs).apply(null, arguments);
      }),
      Iu = (a._emscripten_bind_b2WheelJointDef_get_lowerTranslation_0 =
        function () {
          return (Iu =
            a._emscripten_bind_b2WheelJointDef_get_lowerTranslation_0 =
              a.asm.ss).apply(null, arguments);
        }),
      Ju = (a._emscripten_bind_b2WheelJointDef_set_lowerTranslation_1 =
        function () {
          return (Ju =
            a._emscripten_bind_b2WheelJointDef_set_lowerTranslation_1 =
              a.asm.ts).apply(null, arguments);
        }),
      Ku = (a._emscripten_bind_b2WheelJointDef_get_upperTranslation_0 =
        function () {
          return (Ku =
            a._emscripten_bind_b2WheelJointDef_get_upperTranslation_0 =
              a.asm.us).apply(null, arguments);
        }),
      Lu = (a._emscripten_bind_b2WheelJointDef_set_upperTranslation_1 =
        function () {
          return (Lu =
            a._emscripten_bind_b2WheelJointDef_set_upperTranslation_1 =
              a.asm.vs).apply(null, arguments);
        }),
      Mu = (a._emscripten_bind_b2WheelJointDef_get_enableMotor_0 = function () {
        return (Mu = a._emscripten_bind_b2WheelJointDef_get_enableMotor_0 =
          a.asm.ws).apply(null, arguments);
      }),
      Nu = (a._emscripten_bind_b2WheelJointDef_set_enableMotor_1 = function () {
        return (Nu = a._emscripten_bind_b2WheelJointDef_set_enableMotor_1 =
          a.asm.xs).apply(null, arguments);
      }),
      Ou = (a._emscripten_bind_b2WheelJointDef_get_maxMotorTorque_0 =
        function () {
          return (Ou = a._emscripten_bind_b2WheelJointDef_get_maxMotorTorque_0 =
            a.asm.ys).apply(null, arguments);
        }),
      Pu = (a._emscripten_bind_b2WheelJointDef_set_maxMotorTorque_1 =
        function () {
          return (Pu = a._emscripten_bind_b2WheelJointDef_set_maxMotorTorque_1 =
            a.asm.zs).apply(null, arguments);
        }),
      Qu = (a._emscripten_bind_b2WheelJointDef_get_motorSpeed_0 = function () {
        return (Qu = a._emscripten_bind_b2WheelJointDef_get_motorSpeed_0 =
          a.asm.As).apply(null, arguments);
      }),
      Ru = (a._emscripten_bind_b2WheelJointDef_set_motorSpeed_1 = function () {
        return (Ru = a._emscripten_bind_b2WheelJointDef_set_motorSpeed_1 =
          a.asm.Bs).apply(null, arguments);
      }),
      Su = (a._emscripten_bind_b2WheelJointDef_get_stiffness_0 = function () {
        return (Su = a._emscripten_bind_b2WheelJointDef_get_stiffness_0 =
          a.asm.Cs).apply(null, arguments);
      }),
      Tu = (a._emscripten_bind_b2WheelJointDef_set_stiffness_1 = function () {
        return (Tu = a._emscripten_bind_b2WheelJointDef_set_stiffness_1 =
          a.asm.Ds).apply(null, arguments);
      }),
      Uu = (a._emscripten_bind_b2WheelJointDef_get_damping_0 = function () {
        return (Uu = a._emscripten_bind_b2WheelJointDef_get_damping_0 =
          a.asm.Es).apply(null, arguments);
      }),
      Vu = (a._emscripten_bind_b2WheelJointDef_set_damping_1 = function () {
        return (Vu = a._emscripten_bind_b2WheelJointDef_set_damping_1 =
          a.asm.Fs).apply(null, arguments);
      }),
      Wu = (a._emscripten_bind_b2WheelJointDef_get_type_0 = function () {
        return (Wu = a._emscripten_bind_b2WheelJointDef_get_type_0 =
          a.asm.Gs).apply(null, arguments);
      }),
      Xu = (a._emscripten_bind_b2WheelJointDef_set_type_1 = function () {
        return (Xu = a._emscripten_bind_b2WheelJointDef_set_type_1 =
          a.asm.Hs).apply(null, arguments);
      }),
      Yu = (a._emscripten_bind_b2WheelJointDef_get_userData_0 = function () {
        return (Yu = a._emscripten_bind_b2WheelJointDef_get_userData_0 =
          a.asm.Is).apply(null, arguments);
      }),
      Zu = (a._emscripten_bind_b2WheelJointDef_set_userData_1 = function () {
        return (Zu = a._emscripten_bind_b2WheelJointDef_set_userData_1 =
          a.asm.Js).apply(null, arguments);
      }),
      $u = (a._emscripten_bind_b2WheelJointDef_get_bodyA_0 = function () {
        return ($u = a._emscripten_bind_b2WheelJointDef_get_bodyA_0 =
          a.asm.Ks).apply(null, arguments);
      }),
      av = (a._emscripten_bind_b2WheelJointDef_set_bodyA_1 = function () {
        return (av = a._emscripten_bind_b2WheelJointDef_set_bodyA_1 =
          a.asm.Ls).apply(null, arguments);
      }),
      bv = (a._emscripten_bind_b2WheelJointDef_get_bodyB_0 = function () {
        return (bv = a._emscripten_bind_b2WheelJointDef_get_bodyB_0 =
          a.asm.Ms).apply(null, arguments);
      }),
      cv = (a._emscripten_bind_b2WheelJointDef_set_bodyB_1 = function () {
        return (cv = a._emscripten_bind_b2WheelJointDef_set_bodyB_1 =
          a.asm.Ns).apply(null, arguments);
      }),
      dv = (a._emscripten_bind_b2WheelJointDef_get_collideConnected_0 =
        function () {
          return (dv =
            a._emscripten_bind_b2WheelJointDef_get_collideConnected_0 =
              a.asm.Os).apply(null, arguments);
        }),
      ev = (a._emscripten_bind_b2WheelJointDef_set_collideConnected_1 =
        function () {
          return (ev =
            a._emscripten_bind_b2WheelJointDef_set_collideConnected_1 =
              a.asm.Ps).apply(null, arguments);
        }),
      fv = (a._emscripten_bind_b2WheelJointDef___destroy___0 = function () {
        return (fv = a._emscripten_bind_b2WheelJointDef___destroy___0 =
          a.asm.Qs).apply(null, arguments);
      }),
      gv = (a._emscripten_bind_b2MotorJoint_SetLinearOffset_1 = function () {
        return (gv = a._emscripten_bind_b2MotorJoint_SetLinearOffset_1 =
          a.asm.Rs).apply(null, arguments);
      }),
      hv = (a._emscripten_bind_b2MotorJoint_GetLinearOffset_0 = function () {
        return (hv = a._emscripten_bind_b2MotorJoint_GetLinearOffset_0 =
          a.asm.Ss).apply(null, arguments);
      }),
      iv = (a._emscripten_bind_b2MotorJoint_SetAngularOffset_1 = function () {
        return (iv = a._emscripten_bind_b2MotorJoint_SetAngularOffset_1 =
          a.asm.Ts).apply(null, arguments);
      }),
      jv = (a._emscripten_bind_b2MotorJoint_GetAngularOffset_0 = function () {
        return (jv = a._emscripten_bind_b2MotorJoint_GetAngularOffset_0 =
          a.asm.Us).apply(null, arguments);
      }),
      kv = (a._emscripten_bind_b2MotorJoint_SetMaxForce_1 = function () {
        return (kv = a._emscripten_bind_b2MotorJoint_SetMaxForce_1 =
          a.asm.Vs).apply(null, arguments);
      }),
      lv = (a._emscripten_bind_b2MotorJoint_GetMaxForce_0 = function () {
        return (lv = a._emscripten_bind_b2MotorJoint_GetMaxForce_0 =
          a.asm.Ws).apply(null, arguments);
      }),
      mv = (a._emscripten_bind_b2MotorJoint_SetMaxTorque_1 = function () {
        return (mv = a._emscripten_bind_b2MotorJoint_SetMaxTorque_1 =
          a.asm.Xs).apply(null, arguments);
      }),
      nv = (a._emscripten_bind_b2MotorJoint_GetMaxTorque_0 = function () {
        return (nv = a._emscripten_bind_b2MotorJoint_GetMaxTorque_0 =
          a.asm.Ys).apply(null, arguments);
      }),
      ov = (a._emscripten_bind_b2MotorJoint_SetCorrectionFactor_1 =
        function () {
          return (ov = a._emscripten_bind_b2MotorJoint_SetCorrectionFactor_1 =
            a.asm.Zs).apply(null, arguments);
        }),
      pv = (a._emscripten_bind_b2MotorJoint_GetCorrectionFactor_0 =
        function () {
          return (pv = a._emscripten_bind_b2MotorJoint_GetCorrectionFactor_0 =
            a.asm._s).apply(null, arguments);
        }),
      qv = (a._emscripten_bind_b2MotorJoint_GetType_0 = function () {
        return (qv = a._emscripten_bind_b2MotorJoint_GetType_0 =
          a.asm.$s).apply(null, arguments);
      }),
      rv = (a._emscripten_bind_b2MotorJoint_GetBodyA_0 = function () {
        return (rv = a._emscripten_bind_b2MotorJoint_GetBodyA_0 =
          a.asm.at).apply(null, arguments);
      }),
      sv = (a._emscripten_bind_b2MotorJoint_GetBodyB_0 = function () {
        return (sv = a._emscripten_bind_b2MotorJoint_GetBodyB_0 =
          a.asm.bt).apply(null, arguments);
      }),
      tv = (a._emscripten_bind_b2MotorJoint_GetAnchorA_0 = function () {
        return (tv = a._emscripten_bind_b2MotorJoint_GetAnchorA_0 =
          a.asm.ct).apply(null, arguments);
      }),
      uv = (a._emscripten_bind_b2MotorJoint_GetAnchorB_0 = function () {
        return (uv = a._emscripten_bind_b2MotorJoint_GetAnchorB_0 =
          a.asm.dt).apply(null, arguments);
      }),
      vv = (a._emscripten_bind_b2MotorJoint_GetReactionForce_1 = function () {
        return (vv = a._emscripten_bind_b2MotorJoint_GetReactionForce_1 =
          a.asm.et).apply(null, arguments);
      }),
      wv = (a._emscripten_bind_b2MotorJoint_GetReactionTorque_1 = function () {
        return (wv = a._emscripten_bind_b2MotorJoint_GetReactionTorque_1 =
          a.asm.ft).apply(null, arguments);
      }),
      xv = (a._emscripten_bind_b2MotorJoint_GetNext_0 = function () {
        return (xv = a._emscripten_bind_b2MotorJoint_GetNext_0 =
          a.asm.gt).apply(null, arguments);
      }),
      yv = (a._emscripten_bind_b2MotorJoint_GetUserData_0 = function () {
        return (yv = a._emscripten_bind_b2MotorJoint_GetUserData_0 =
          a.asm.ht).apply(null, arguments);
      }),
      zv = (a._emscripten_bind_b2MotorJoint_GetCollideConnected_0 =
        function () {
          return (zv = a._emscripten_bind_b2MotorJoint_GetCollideConnected_0 =
            a.asm.it).apply(null, arguments);
        }),
      Av = (a._emscripten_bind_b2MotorJoint___destroy___0 = function () {
        return (Av = a._emscripten_bind_b2MotorJoint___destroy___0 =
          a.asm.jt).apply(null, arguments);
      }),
      Bv = (a._emscripten_bind_b2MotorJointDef_b2MotorJointDef_0 = function () {
        return (Bv = a._emscripten_bind_b2MotorJointDef_b2MotorJointDef_0 =
          a.asm.kt).apply(null, arguments);
      }),
      Cv = (a._emscripten_bind_b2MotorJointDef_Initialize_2 = function () {
        return (Cv = a._emscripten_bind_b2MotorJointDef_Initialize_2 =
          a.asm.lt).apply(null, arguments);
      }),
      Dv = (a._emscripten_bind_b2MotorJointDef_get_linearOffset_0 =
        function () {
          return (Dv = a._emscripten_bind_b2MotorJointDef_get_linearOffset_0 =
            a.asm.mt).apply(null, arguments);
        }),
      Ev = (a._emscripten_bind_b2MotorJointDef_set_linearOffset_1 =
        function () {
          return (Ev = a._emscripten_bind_b2MotorJointDef_set_linearOffset_1 =
            a.asm.nt).apply(null, arguments);
        }),
      Fv = (a._emscripten_bind_b2MotorJointDef_get_angularOffset_0 =
        function () {
          return (Fv = a._emscripten_bind_b2MotorJointDef_get_angularOffset_0 =
            a.asm.ot).apply(null, arguments);
        }),
      Gv = (a._emscripten_bind_b2MotorJointDef_set_angularOffset_1 =
        function () {
          return (Gv = a._emscripten_bind_b2MotorJointDef_set_angularOffset_1 =
            a.asm.pt).apply(null, arguments);
        }),
      Hv = (a._emscripten_bind_b2MotorJointDef_get_maxForce_0 = function () {
        return (Hv = a._emscripten_bind_b2MotorJointDef_get_maxForce_0 =
          a.asm.qt).apply(null, arguments);
      }),
      Iv = (a._emscripten_bind_b2MotorJointDef_set_maxForce_1 = function () {
        return (Iv = a._emscripten_bind_b2MotorJointDef_set_maxForce_1 =
          a.asm.rt).apply(null, arguments);
      }),
      Jv = (a._emscripten_bind_b2MotorJointDef_get_maxTorque_0 = function () {
        return (Jv = a._emscripten_bind_b2MotorJointDef_get_maxTorque_0 =
          a.asm.st).apply(null, arguments);
      }),
      Kv = (a._emscripten_bind_b2MotorJointDef_set_maxTorque_1 = function () {
        return (Kv = a._emscripten_bind_b2MotorJointDef_set_maxTorque_1 =
          a.asm.tt).apply(null, arguments);
      }),
      Lv = (a._emscripten_bind_b2MotorJointDef_get_correctionFactor_0 =
        function () {
          return (Lv =
            a._emscripten_bind_b2MotorJointDef_get_correctionFactor_0 =
              a.asm.ut).apply(null, arguments);
        }),
      Mv = (a._emscripten_bind_b2MotorJointDef_set_correctionFactor_1 =
        function () {
          return (Mv =
            a._emscripten_bind_b2MotorJointDef_set_correctionFactor_1 =
              a.asm.vt).apply(null, arguments);
        }),
      Nv = (a._emscripten_bind_b2MotorJointDef_get_type_0 = function () {
        return (Nv = a._emscripten_bind_b2MotorJointDef_get_type_0 =
          a.asm.wt).apply(null, arguments);
      }),
      Ov = (a._emscripten_bind_b2MotorJointDef_set_type_1 = function () {
        return (Ov = a._emscripten_bind_b2MotorJointDef_set_type_1 =
          a.asm.xt).apply(null, arguments);
      }),
      Pv = (a._emscripten_bind_b2MotorJointDef_get_userData_0 = function () {
        return (Pv = a._emscripten_bind_b2MotorJointDef_get_userData_0 =
          a.asm.yt).apply(null, arguments);
      }),
      Qv = (a._emscripten_bind_b2MotorJointDef_set_userData_1 = function () {
        return (Qv = a._emscripten_bind_b2MotorJointDef_set_userData_1 =
          a.asm.zt).apply(null, arguments);
      }),
      Rv = (a._emscripten_bind_b2MotorJointDef_get_bodyA_0 = function () {
        return (Rv = a._emscripten_bind_b2MotorJointDef_get_bodyA_0 =
          a.asm.At).apply(null, arguments);
      }),
      Sv = (a._emscripten_bind_b2MotorJointDef_set_bodyA_1 = function () {
        return (Sv = a._emscripten_bind_b2MotorJointDef_set_bodyA_1 =
          a.asm.Bt).apply(null, arguments);
      }),
      Tv = (a._emscripten_bind_b2MotorJointDef_get_bodyB_0 = function () {
        return (Tv = a._emscripten_bind_b2MotorJointDef_get_bodyB_0 =
          a.asm.Ct).apply(null, arguments);
      }),
      Uv = (a._emscripten_bind_b2MotorJointDef_set_bodyB_1 = function () {
        return (Uv = a._emscripten_bind_b2MotorJointDef_set_bodyB_1 =
          a.asm.Dt).apply(null, arguments);
      }),
      Vv = (a._emscripten_bind_b2MotorJointDef_get_collideConnected_0 =
        function () {
          return (Vv =
            a._emscripten_bind_b2MotorJointDef_get_collideConnected_0 =
              a.asm.Et).apply(null, arguments);
        }),
      Wv = (a._emscripten_bind_b2MotorJointDef_set_collideConnected_1 =
        function () {
          return (Wv =
            a._emscripten_bind_b2MotorJointDef_set_collideConnected_1 =
              a.asm.Ft).apply(null, arguments);
        }),
      Xv = (a._emscripten_bind_b2MotorJointDef___destroy___0 = function () {
        return (Xv = a._emscripten_bind_b2MotorJointDef___destroy___0 =
          a.asm.Gt).apply(null, arguments);
      }),
      Yv = (a._emscripten_bind_b2RopeTuning_b2RopeTuning_0 = function () {
        return (Yv = a._emscripten_bind_b2RopeTuning_b2RopeTuning_0 =
          a.asm.Ht).apply(null, arguments);
      }),
      Zv = (a._emscripten_bind_b2RopeTuning_get_stretchingModel_0 =
        function () {
          return (Zv = a._emscripten_bind_b2RopeTuning_get_stretchingModel_0 =
            a.asm.It).apply(null, arguments);
        }),
      $v = (a._emscripten_bind_b2RopeTuning_set_stretchingModel_1 =
        function () {
          return ($v = a._emscripten_bind_b2RopeTuning_set_stretchingModel_1 =
            a.asm.Jt).apply(null, arguments);
        }),
      aw = (a._emscripten_bind_b2RopeTuning_get_bendingModel_0 = function () {
        return (aw = a._emscripten_bind_b2RopeTuning_get_bendingModel_0 =
          a.asm.Kt).apply(null, arguments);
      }),
      bw = (a._emscripten_bind_b2RopeTuning_set_bendingModel_1 = function () {
        return (bw = a._emscripten_bind_b2RopeTuning_set_bendingModel_1 =
          a.asm.Lt).apply(null, arguments);
      }),
      cw = (a._emscripten_bind_b2RopeTuning_get_damping_0 = function () {
        return (cw = a._emscripten_bind_b2RopeTuning_get_damping_0 =
          a.asm.Mt).apply(null, arguments);
      }),
      dw = (a._emscripten_bind_b2RopeTuning_set_damping_1 = function () {
        return (dw = a._emscripten_bind_b2RopeTuning_set_damping_1 =
          a.asm.Nt).apply(null, arguments);
      }),
      ew = (a._emscripten_bind_b2RopeTuning_get_stretchStiffness_0 =
        function () {
          return (ew = a._emscripten_bind_b2RopeTuning_get_stretchStiffness_0 =
            a.asm.Ot).apply(null, arguments);
        }),
      fw = (a._emscripten_bind_b2RopeTuning_set_stretchStiffness_1 =
        function () {
          return (fw = a._emscripten_bind_b2RopeTuning_set_stretchStiffness_1 =
            a.asm.Pt).apply(null, arguments);
        }),
      gw = (a._emscripten_bind_b2RopeTuning_get_stretchHertz_0 = function () {
        return (gw = a._emscripten_bind_b2RopeTuning_get_stretchHertz_0 =
          a.asm.Qt).apply(null, arguments);
      }),
      hw = (a._emscripten_bind_b2RopeTuning_set_stretchHertz_1 = function () {
        return (hw = a._emscripten_bind_b2RopeTuning_set_stretchHertz_1 =
          a.asm.Rt).apply(null, arguments);
      }),
      iw = (a._emscripten_bind_b2RopeTuning_get_stretchDamping_0 = function () {
        return (iw = a._emscripten_bind_b2RopeTuning_get_stretchDamping_0 =
          a.asm.St).apply(null, arguments);
      }),
      jw = (a._emscripten_bind_b2RopeTuning_set_stretchDamping_1 = function () {
        return (jw = a._emscripten_bind_b2RopeTuning_set_stretchDamping_1 =
          a.asm.Tt).apply(null, arguments);
      }),
      kw = (a._emscripten_bind_b2RopeTuning_get_bendStiffness_0 = function () {
        return (kw = a._emscripten_bind_b2RopeTuning_get_bendStiffness_0 =
          a.asm.Ut).apply(null, arguments);
      }),
      lw = (a._emscripten_bind_b2RopeTuning_set_bendStiffness_1 = function () {
        return (lw = a._emscripten_bind_b2RopeTuning_set_bendStiffness_1 =
          a.asm.Vt).apply(null, arguments);
      }),
      mw = (a._emscripten_bind_b2RopeTuning_get_bendHertz_0 = function () {
        return (mw = a._emscripten_bind_b2RopeTuning_get_bendHertz_0 =
          a.asm.Wt).apply(null, arguments);
      }),
      nw = (a._emscripten_bind_b2RopeTuning_set_bendHertz_1 = function () {
        return (nw = a._emscripten_bind_b2RopeTuning_set_bendHertz_1 =
          a.asm.Xt).apply(null, arguments);
      }),
      ow = (a._emscripten_bind_b2RopeTuning_get_bendDamping_0 = function () {
        return (ow = a._emscripten_bind_b2RopeTuning_get_bendDamping_0 =
          a.asm.Yt).apply(null, arguments);
      }),
      pw = (a._emscripten_bind_b2RopeTuning_set_bendDamping_1 = function () {
        return (pw = a._emscripten_bind_b2RopeTuning_set_bendDamping_1 =
          a.asm.Zt).apply(null, arguments);
      }),
      qw = (a._emscripten_bind_b2RopeTuning_get_isometric_0 = function () {
        return (qw = a._emscripten_bind_b2RopeTuning_get_isometric_0 =
          a.asm._t).apply(null, arguments);
      }),
      rw = (a._emscripten_bind_b2RopeTuning_set_isometric_1 = function () {
        return (rw = a._emscripten_bind_b2RopeTuning_set_isometric_1 =
          a.asm.$t).apply(null, arguments);
      }),
      sw = (a._emscripten_bind_b2RopeTuning_get_fixedEffectiveMass_0 =
        function () {
          return (sw =
            a._emscripten_bind_b2RopeTuning_get_fixedEffectiveMass_0 =
              a.asm.au).apply(null, arguments);
        }),
      tw = (a._emscripten_bind_b2RopeTuning_set_fixedEffectiveMass_1 =
        function () {
          return (tw =
            a._emscripten_bind_b2RopeTuning_set_fixedEffectiveMass_1 =
              a.asm.bu).apply(null, arguments);
        }),
      uw = (a._emscripten_bind_b2RopeTuning_get_warmStart_0 = function () {
        return (uw = a._emscripten_bind_b2RopeTuning_get_warmStart_0 =
          a.asm.cu).apply(null, arguments);
      }),
      vw = (a._emscripten_bind_b2RopeTuning_set_warmStart_1 = function () {
        return (vw = a._emscripten_bind_b2RopeTuning_set_warmStart_1 =
          a.asm.du).apply(null, arguments);
      }),
      ww = (a._emscripten_bind_b2RopeTuning___destroy___0 = function () {
        return (ww = a._emscripten_bind_b2RopeTuning___destroy___0 =
          a.asm.eu).apply(null, arguments);
      }),
      xw = (a._emscripten_bind_b2RopeDef_b2RopeDef_0 = function () {
        return (xw = a._emscripten_bind_b2RopeDef_b2RopeDef_0 = a.asm.fu).apply(
          null,
          arguments,
        );
      }),
      yw = (a._emscripten_bind_b2RopeDef_get_position_0 = function () {
        return (yw = a._emscripten_bind_b2RopeDef_get_position_0 =
          a.asm.gu).apply(null, arguments);
      }),
      zw = (a._emscripten_bind_b2RopeDef_set_position_1 = function () {
        return (zw = a._emscripten_bind_b2RopeDef_set_position_1 =
          a.asm.hu).apply(null, arguments);
      }),
      Aw = (a._emscripten_bind_b2RopeDef_get_vertices_0 = function () {
        return (Aw = a._emscripten_bind_b2RopeDef_get_vertices_0 =
          a.asm.iu).apply(null, arguments);
      }),
      Bw = (a._emscripten_bind_b2RopeDef_set_vertices_1 = function () {
        return (Bw = a._emscripten_bind_b2RopeDef_set_vertices_1 =
          a.asm.ju).apply(null, arguments);
      }),
      Cw = (a._emscripten_bind_b2RopeDef_get_count_0 = function () {
        return (Cw = a._emscripten_bind_b2RopeDef_get_count_0 = a.asm.ku).apply(
          null,
          arguments,
        );
      }),
      Dw = (a._emscripten_bind_b2RopeDef_set_count_1 = function () {
        return (Dw = a._emscripten_bind_b2RopeDef_set_count_1 = a.asm.lu).apply(
          null,
          arguments,
        );
      }),
      Ew = (a._emscripten_bind_b2RopeDef_get_gravity_0 = function () {
        return (Ew = a._emscripten_bind_b2RopeDef_get_gravity_0 =
          a.asm.mu).apply(null, arguments);
      }),
      Fw = (a._emscripten_bind_b2RopeDef_set_gravity_1 = function () {
        return (Fw = a._emscripten_bind_b2RopeDef_set_gravity_1 =
          a.asm.nu).apply(null, arguments);
      }),
      Gw = (a._emscripten_bind_b2RopeDef_get_tuning_0 = function () {
        return (Gw = a._emscripten_bind_b2RopeDef_get_tuning_0 =
          a.asm.ou).apply(null, arguments);
      }),
      Hw = (a._emscripten_bind_b2RopeDef_set_tuning_1 = function () {
        return (Hw = a._emscripten_bind_b2RopeDef_set_tuning_1 =
          a.asm.pu).apply(null, arguments);
      }),
      Iw = (a._emscripten_bind_b2RopeDef___destroy___0 = function () {
        return (Iw = a._emscripten_bind_b2RopeDef___destroy___0 =
          a.asm.qu).apply(null, arguments);
      }),
      Jw = (a._emscripten_bind_b2Rope_b2Rope_0 = function () {
        return (Jw = a._emscripten_bind_b2Rope_b2Rope_0 = a.asm.ru).apply(
          null,
          arguments,
        );
      }),
      Kw = (a._emscripten_bind_b2Rope_Create_1 = function () {
        return (Kw = a._emscripten_bind_b2Rope_Create_1 = a.asm.su).apply(
          null,
          arguments,
        );
      }),
      Lw = (a._emscripten_bind_b2Rope_SetTuning_1 = function () {
        return (Lw = a._emscripten_bind_b2Rope_SetTuning_1 = a.asm.tu).apply(
          null,
          arguments,
        );
      }),
      Mw = (a._emscripten_bind_b2Rope_Step_3 = function () {
        return (Mw = a._emscripten_bind_b2Rope_Step_3 = a.asm.uu).apply(
          null,
          arguments,
        );
      }),
      Nw = (a._emscripten_bind_b2Rope_Reset_1 = function () {
        return (Nw = a._emscripten_bind_b2Rope_Reset_1 = a.asm.vu).apply(
          null,
          arguments,
        );
      }),
      Ow = (a._emscripten_bind_b2Rope_Draw_1 = function () {
        return (Ow = a._emscripten_bind_b2Rope_Draw_1 = a.asm.wu).apply(
          null,
          arguments,
        );
      }),
      Pw = (a._emscripten_bind_b2Rope___destroy___0 = function () {
        return (Pw = a._emscripten_bind_b2Rope___destroy___0 = a.asm.xu).apply(
          null,
          arguments,
        );
      }),
      Qw = (a._emscripten_bind_b2ClipVertex_b2ClipVertex_0 = function () {
        return (Qw = a._emscripten_bind_b2ClipVertex_b2ClipVertex_0 =
          a.asm.yu).apply(null, arguments);
      }),
      Rw = (a._emscripten_bind_b2ClipVertex_get_v_0 = function () {
        return (Rw = a._emscripten_bind_b2ClipVertex_get_v_0 = a.asm.zu).apply(
          null,
          arguments,
        );
      }),
      Sw = (a._emscripten_bind_b2ClipVertex_set_v_1 = function () {
        return (Sw = a._emscripten_bind_b2ClipVertex_set_v_1 = a.asm.Au).apply(
          null,
          arguments,
        );
      }),
      Tw = (a._emscripten_bind_b2ClipVertex_get_id_0 = function () {
        return (Tw = a._emscripten_bind_b2ClipVertex_get_id_0 = a.asm.Bu).apply(
          null,
          arguments,
        );
      }),
      Uw = (a._emscripten_bind_b2ClipVertex_set_id_1 = function () {
        return (Uw = a._emscripten_bind_b2ClipVertex_set_id_1 = a.asm.Cu).apply(
          null,
          arguments,
        );
      }),
      Vw = (a._emscripten_bind_b2ClipVertex___destroy___0 = function () {
        return (Vw = a._emscripten_bind_b2ClipVertex___destroy___0 =
          a.asm.Du).apply(null, arguments);
      }),
      Ww = (a._emscripten_bind_b2ParticleColor_b2ParticleColor_0 = function () {
        return (Ww = a._emscripten_bind_b2ParticleColor_b2ParticleColor_0 =
          a.asm.Eu).apply(null, arguments);
      }),
      Xw = (a._emscripten_bind_b2ParticleColor_b2ParticleColor_1 = function () {
        return (Xw = a._emscripten_bind_b2ParticleColor_b2ParticleColor_1 =
          a.asm.Fu).apply(null, arguments);
      }),
      Yw = (a._emscripten_bind_b2ParticleColor_b2ParticleColor_4 = function () {
        return (Yw = a._emscripten_bind_b2ParticleColor_b2ParticleColor_4 =
          a.asm.Gu).apply(null, arguments);
      }),
      Zw = (a._emscripten_bind_b2ParticleColor_IsZero_0 = function () {
        return (Zw = a._emscripten_bind_b2ParticleColor_IsZero_0 =
          a.asm.Hu).apply(null, arguments);
      }),
      $w = (a._emscripten_bind_b2ParticleColor_GetColor_0 = function () {
        return ($w = a._emscripten_bind_b2ParticleColor_GetColor_0 =
          a.asm.Iu).apply(null, arguments);
      }),
      ax = (a._emscripten_bind_b2ParticleColor_Set_1 = function () {
        return (ax = a._emscripten_bind_b2ParticleColor_Set_1 = a.asm.Ju).apply(
          null,
          arguments,
        );
      }),
      bx = (a._emscripten_bind_b2ParticleColor_Set_4 = function () {
        return (bx = a._emscripten_bind_b2ParticleColor_Set_4 = a.asm.Ku).apply(
          null,
          arguments,
        );
      }),
      cx = (a._emscripten_bind_b2ParticleColor_op_ass_1 = function () {
        return (cx = a._emscripten_bind_b2ParticleColor_op_ass_1 =
          a.asm.Lu).apply(null, arguments);
      }),
      dx = (a._emscripten_bind_b2ParticleColor_op_mul_ass_1 = function () {
        return (dx = a._emscripten_bind_b2ParticleColor_op_mul_ass_1 =
          a.asm.Mu).apply(null, arguments);
      }),
      ex = (a._emscripten_bind_b2ParticleColor_op_add_ass_1 = function () {
        return (ex = a._emscripten_bind_b2ParticleColor_op_add_ass_1 =
          a.asm.Nu).apply(null, arguments);
      }),
      fx = (a._emscripten_bind_b2ParticleColor_op_sub_ass_1 = function () {
        return (fx = a._emscripten_bind_b2ParticleColor_op_sub_ass_1 =
          a.asm.Ou).apply(null, arguments);
      }),
      gx = (a._emscripten_bind_b2ParticleColor_op_eq_1 = function () {
        return (gx = a._emscripten_bind_b2ParticleColor_op_eq_1 =
          a.asm.Pu).apply(null, arguments);
      }),
      hx = (a._emscripten_bind_b2ParticleColor_Mix_2 = function () {
        return (hx = a._emscripten_bind_b2ParticleColor_Mix_2 = a.asm.Qu).apply(
          null,
          arguments,
        );
      }),
      ix = (a._emscripten_bind_b2ParticleColor_MixColors_3 = function () {
        return (ix = a._emscripten_bind_b2ParticleColor_MixColors_3 =
          a.asm.Ru).apply(null, arguments);
      }),
      jx = (a._emscripten_bind_b2ParticleColor_get_r_0 = function () {
        return (jx = a._emscripten_bind_b2ParticleColor_get_r_0 =
          a.asm.Su).apply(null, arguments);
      }),
      kx = (a._emscripten_bind_b2ParticleColor_set_r_1 = function () {
        return (kx = a._emscripten_bind_b2ParticleColor_set_r_1 =
          a.asm.Tu).apply(null, arguments);
      }),
      lx = (a._emscripten_bind_b2ParticleColor_get_g_0 = function () {
        return (lx = a._emscripten_bind_b2ParticleColor_get_g_0 =
          a.asm.Uu).apply(null, arguments);
      }),
      mx = (a._emscripten_bind_b2ParticleColor_set_g_1 = function () {
        return (mx = a._emscripten_bind_b2ParticleColor_set_g_1 =
          a.asm.Vu).apply(null, arguments);
      }),
      nx = (a._emscripten_bind_b2ParticleColor_get_b_0 = function () {
        return (nx = a._emscripten_bind_b2ParticleColor_get_b_0 =
          a.asm.Wu).apply(null, arguments);
      }),
      ox = (a._emscripten_bind_b2ParticleColor_set_b_1 = function () {
        return (ox = a._emscripten_bind_b2ParticleColor_set_b_1 =
          a.asm.Xu).apply(null, arguments);
      }),
      px = (a._emscripten_bind_b2ParticleColor_get_a_0 = function () {
        return (px = a._emscripten_bind_b2ParticleColor_get_a_0 =
          a.asm.Yu).apply(null, arguments);
      }),
      qx = (a._emscripten_bind_b2ParticleColor_set_a_1 = function () {
        return (qx = a._emscripten_bind_b2ParticleColor_set_a_1 =
          a.asm.Zu).apply(null, arguments);
      }),
      rx = (a._emscripten_bind_b2ParticleColor___destroy___0 = function () {
        return (rx = a._emscripten_bind_b2ParticleColor___destroy___0 =
          a.asm._u).apply(null, arguments);
      }),
      sx = (a._emscripten_bind_b2ParticleDef_b2ParticleDef_0 = function () {
        return (sx = a._emscripten_bind_b2ParticleDef_b2ParticleDef_0 =
          a.asm.$u).apply(null, arguments);
      }),
      tx = (a._emscripten_bind_b2ParticleDef_get_flags_0 = function () {
        return (tx = a._emscripten_bind_b2ParticleDef_get_flags_0 =
          a.asm.av).apply(null, arguments);
      }),
      ux = (a._emscripten_bind_b2ParticleDef_set_flags_1 = function () {
        return (ux = a._emscripten_bind_b2ParticleDef_set_flags_1 =
          a.asm.bv).apply(null, arguments);
      }),
      vx = (a._emscripten_bind_b2ParticleDef_get_position_0 = function () {
        return (vx = a._emscripten_bind_b2ParticleDef_get_position_0 =
          a.asm.cv).apply(null, arguments);
      }),
      wx = (a._emscripten_bind_b2ParticleDef_set_position_1 = function () {
        return (wx = a._emscripten_bind_b2ParticleDef_set_position_1 =
          a.asm.dv).apply(null, arguments);
      }),
      xx = (a._emscripten_bind_b2ParticleDef_get_velocity_0 = function () {
        return (xx = a._emscripten_bind_b2ParticleDef_get_velocity_0 =
          a.asm.ev).apply(null, arguments);
      }),
      yx = (a._emscripten_bind_b2ParticleDef_set_velocity_1 = function () {
        return (yx = a._emscripten_bind_b2ParticleDef_set_velocity_1 =
          a.asm.fv).apply(null, arguments);
      }),
      zx = (a._emscripten_bind_b2ParticleDef_get_color_0 = function () {
        return (zx = a._emscripten_bind_b2ParticleDef_get_color_0 =
          a.asm.gv).apply(null, arguments);
      }),
      Ax = (a._emscripten_bind_b2ParticleDef_set_color_1 = function () {
        return (Ax = a._emscripten_bind_b2ParticleDef_set_color_1 =
          a.asm.hv).apply(null, arguments);
      }),
      Bx = (a._emscripten_bind_b2ParticleDef_get_lifetime_0 = function () {
        return (Bx = a._emscripten_bind_b2ParticleDef_get_lifetime_0 =
          a.asm.iv).apply(null, arguments);
      }),
      Cx = (a._emscripten_bind_b2ParticleDef_set_lifetime_1 = function () {
        return (Cx = a._emscripten_bind_b2ParticleDef_set_lifetime_1 =
          a.asm.jv).apply(null, arguments);
      }),
      Dx = (a._emscripten_bind_b2ParticleDef_get_userData_0 = function () {
        return (Dx = a._emscripten_bind_b2ParticleDef_get_userData_0 =
          a.asm.kv).apply(null, arguments);
      }),
      Ex = (a._emscripten_bind_b2ParticleDef_set_userData_1 = function () {
        return (Ex = a._emscripten_bind_b2ParticleDef_set_userData_1 =
          a.asm.lv).apply(null, arguments);
      }),
      Fx = (a._emscripten_bind_b2ParticleDef_get_group_0 = function () {
        return (Fx = a._emscripten_bind_b2ParticleDef_get_group_0 =
          a.asm.mv).apply(null, arguments);
      }),
      Gx = (a._emscripten_bind_b2ParticleDef_set_group_1 = function () {
        return (Gx = a._emscripten_bind_b2ParticleDef_set_group_1 =
          a.asm.nv).apply(null, arguments);
      }),
      Hx = (a._emscripten_bind_b2ParticleDef___destroy___0 = function () {
        return (Hx = a._emscripten_bind_b2ParticleDef___destroy___0 =
          a.asm.ov).apply(null, arguments);
      }),
      Ix = (a._emscripten_bind_b2ParticleGroupDef_b2ParticleGroupDef_0 =
        function () {
          return (Ix =
            a._emscripten_bind_b2ParticleGroupDef_b2ParticleGroupDef_0 =
              a.asm.pv).apply(null, arguments);
        }),
      Jx = (a._emscripten_bind_b2ParticleGroupDef_get_flags_0 = function () {
        return (Jx = a._emscripten_bind_b2ParticleGroupDef_get_flags_0 =
          a.asm.qv).apply(null, arguments);
      }),
      Kx = (a._emscripten_bind_b2ParticleGroupDef_set_flags_1 = function () {
        return (Kx = a._emscripten_bind_b2ParticleGroupDef_set_flags_1 =
          a.asm.rv).apply(null, arguments);
      }),
      Lx = (a._emscripten_bind_b2ParticleGroupDef_get_groupFlags_0 =
        function () {
          return (Lx = a._emscripten_bind_b2ParticleGroupDef_get_groupFlags_0 =
            a.asm.sv).apply(null, arguments);
        }),
      Mx = (a._emscripten_bind_b2ParticleGroupDef_set_groupFlags_1 =
        function () {
          return (Mx = a._emscripten_bind_b2ParticleGroupDef_set_groupFlags_1 =
            a.asm.tv).apply(null, arguments);
        }),
      Nx = (a._emscripten_bind_b2ParticleGroupDef_get_position_0 = function () {
        return (Nx = a._emscripten_bind_b2ParticleGroupDef_get_position_0 =
          a.asm.uv).apply(null, arguments);
      }),
      Ox = (a._emscripten_bind_b2ParticleGroupDef_set_position_1 = function () {
        return (Ox = a._emscripten_bind_b2ParticleGroupDef_set_position_1 =
          a.asm.vv).apply(null, arguments);
      }),
      Px = (a._emscripten_bind_b2ParticleGroupDef_get_angle_0 = function () {
        return (Px = a._emscripten_bind_b2ParticleGroupDef_get_angle_0 =
          a.asm.wv).apply(null, arguments);
      }),
      Qx = (a._emscripten_bind_b2ParticleGroupDef_set_angle_1 = function () {
        return (Qx = a._emscripten_bind_b2ParticleGroupDef_set_angle_1 =
          a.asm.xv).apply(null, arguments);
      }),
      Rx = (a._emscripten_bind_b2ParticleGroupDef_get_linearVelocity_0 =
        function () {
          return (Rx =
            a._emscripten_bind_b2ParticleGroupDef_get_linearVelocity_0 =
              a.asm.yv).apply(null, arguments);
        }),
      Sx = (a._emscripten_bind_b2ParticleGroupDef_set_linearVelocity_1 =
        function () {
          return (Sx =
            a._emscripten_bind_b2ParticleGroupDef_set_linearVelocity_1 =
              a.asm.zv).apply(null, arguments);
        }),
      Tx = (a._emscripten_bind_b2ParticleGroupDef_get_angularVelocity_0 =
        function () {
          return (Tx =
            a._emscripten_bind_b2ParticleGroupDef_get_angularVelocity_0 =
              a.asm.Av).apply(null, arguments);
        }),
      Ux = (a._emscripten_bind_b2ParticleGroupDef_set_angularVelocity_1 =
        function () {
          return (Ux =
            a._emscripten_bind_b2ParticleGroupDef_set_angularVelocity_1 =
              a.asm.Bv).apply(null, arguments);
        }),
      Vx = (a._emscripten_bind_b2ParticleGroupDef_get_color_0 = function () {
        return (Vx = a._emscripten_bind_b2ParticleGroupDef_get_color_0 =
          a.asm.Cv).apply(null, arguments);
      }),
      Wx = (a._emscripten_bind_b2ParticleGroupDef_set_color_1 = function () {
        return (Wx = a._emscripten_bind_b2ParticleGroupDef_set_color_1 =
          a.asm.Dv).apply(null, arguments);
      }),
      Xx = (a._emscripten_bind_b2ParticleGroupDef_get_strength_0 = function () {
        return (Xx = a._emscripten_bind_b2ParticleGroupDef_get_strength_0 =
          a.asm.Ev).apply(null, arguments);
      }),
      Yx = (a._emscripten_bind_b2ParticleGroupDef_set_strength_1 = function () {
        return (Yx = a._emscripten_bind_b2ParticleGroupDef_set_strength_1 =
          a.asm.Fv).apply(null, arguments);
      }),
      Zx = (a._emscripten_bind_b2ParticleGroupDef_get_shape_0 = function () {
        return (Zx = a._emscripten_bind_b2ParticleGroupDef_get_shape_0 =
          a.asm.Gv).apply(null, arguments);
      }),
      $x = (a._emscripten_bind_b2ParticleGroupDef_set_shape_1 = function () {
        return ($x = a._emscripten_bind_b2ParticleGroupDef_set_shape_1 =
          a.asm.Hv).apply(null, arguments);
      }),
      ay = (a._emscripten_bind_b2ParticleGroupDef_get_shapeCount_0 =
        function () {
          return (ay = a._emscripten_bind_b2ParticleGroupDef_get_shapeCount_0 =
            a.asm.Iv).apply(null, arguments);
        }),
      by = (a._emscripten_bind_b2ParticleGroupDef_set_shapeCount_1 =
        function () {
          return (by = a._emscripten_bind_b2ParticleGroupDef_set_shapeCount_1 =
            a.asm.Jv).apply(null, arguments);
        }),
      cy = (a._emscripten_bind_b2ParticleGroupDef_get_stride_0 = function () {
        return (cy = a._emscripten_bind_b2ParticleGroupDef_get_stride_0 =
          a.asm.Kv).apply(null, arguments);
      }),
      dy = (a._emscripten_bind_b2ParticleGroupDef_set_stride_1 = function () {
        return (dy = a._emscripten_bind_b2ParticleGroupDef_set_stride_1 =
          a.asm.Lv).apply(null, arguments);
      }),
      ey = (a._emscripten_bind_b2ParticleGroupDef_get_particleCount_0 =
        function () {
          return (ey =
            a._emscripten_bind_b2ParticleGroupDef_get_particleCount_0 =
              a.asm.Mv).apply(null, arguments);
        }),
      fy = (a._emscripten_bind_b2ParticleGroupDef_set_particleCount_1 =
        function () {
          return (fy =
            a._emscripten_bind_b2ParticleGroupDef_set_particleCount_1 =
              a.asm.Nv).apply(null, arguments);
        }),
      gy = (a._emscripten_bind_b2ParticleGroupDef_get_positionData_0 =
        function () {
          return (gy =
            a._emscripten_bind_b2ParticleGroupDef_get_positionData_0 =
              a.asm.Ov).apply(null, arguments);
        }),
      hy = (a._emscripten_bind_b2ParticleGroupDef_set_positionData_1 =
        function () {
          return (hy =
            a._emscripten_bind_b2ParticleGroupDef_set_positionData_1 =
              a.asm.Pv).apply(null, arguments);
        }),
      iy = (a._emscripten_bind_b2ParticleGroupDef_get_lifetime_0 = function () {
        return (iy = a._emscripten_bind_b2ParticleGroupDef_get_lifetime_0 =
          a.asm.Qv).apply(null, arguments);
      }),
      jy = (a._emscripten_bind_b2ParticleGroupDef_set_lifetime_1 = function () {
        return (jy = a._emscripten_bind_b2ParticleGroupDef_set_lifetime_1 =
          a.asm.Rv).apply(null, arguments);
      }),
      ky = (a._emscripten_bind_b2ParticleGroupDef_get_userData_0 = function () {
        return (ky = a._emscripten_bind_b2ParticleGroupDef_get_userData_0 =
          a.asm.Sv).apply(null, arguments);
      }),
      ly = (a._emscripten_bind_b2ParticleGroupDef_set_userData_1 = function () {
        return (ly = a._emscripten_bind_b2ParticleGroupDef_set_userData_1 =
          a.asm.Tv).apply(null, arguments);
      }),
      my = (a._emscripten_bind_b2ParticleGroupDef_get_group_0 = function () {
        return (my = a._emscripten_bind_b2ParticleGroupDef_get_group_0 =
          a.asm.Uv).apply(null, arguments);
      }),
      ny = (a._emscripten_bind_b2ParticleGroupDef_set_group_1 = function () {
        return (ny = a._emscripten_bind_b2ParticleGroupDef_set_group_1 =
          a.asm.Vv).apply(null, arguments);
      }),
      oy = (a._emscripten_bind_b2ParticleGroupDef___destroy___0 = function () {
        return (oy = a._emscripten_bind_b2ParticleGroupDef___destroy___0 =
          a.asm.Wv).apply(null, arguments);
      }),
      py = (a._emscripten_bind_b2ParticleGroup_GetNext_0 = function () {
        return (py = a._emscripten_bind_b2ParticleGroup_GetNext_0 =
          a.asm.Xv).apply(null, arguments);
      }),
      qy = (a._emscripten_bind_b2ParticleGroup_GetParticleSystem_0 =
        function () {
          return (qy = a._emscripten_bind_b2ParticleGroup_GetParticleSystem_0 =
            a.asm.Yv).apply(null, arguments);
        }),
      ry = (a._emscripten_bind_b2ParticleGroup_GetParticleCount_0 =
        function () {
          return (ry = a._emscripten_bind_b2ParticleGroup_GetParticleCount_0 =
            a.asm.Zv).apply(null, arguments);
        }),
      sy = (a._emscripten_bind_b2ParticleGroup_GetBufferIndex_0 = function () {
        return (sy = a._emscripten_bind_b2ParticleGroup_GetBufferIndex_0 =
          a.asm._v).apply(null, arguments);
      }),
      ty = (a._emscripten_bind_b2ParticleGroup_ContainsParticle_1 =
        function () {
          return (ty = a._emscripten_bind_b2ParticleGroup_ContainsParticle_1 =
            a.asm.$v).apply(null, arguments);
        }),
      uy = (a._emscripten_bind_b2ParticleGroup_GetAllParticleFlags_0 =
        function () {
          return (uy =
            a._emscripten_bind_b2ParticleGroup_GetAllParticleFlags_0 =
              a.asm.aw).apply(null, arguments);
        }),
      vy = (a._emscripten_bind_b2ParticleGroup_GetGroupFlags_0 = function () {
        return (vy = a._emscripten_bind_b2ParticleGroup_GetGroupFlags_0 =
          a.asm.bw).apply(null, arguments);
      }),
      wy = (a._emscripten_bind_b2ParticleGroup_SetGroupFlags_1 = function () {
        return (wy = a._emscripten_bind_b2ParticleGroup_SetGroupFlags_1 =
          a.asm.cw).apply(null, arguments);
      }),
      xy = (a._emscripten_bind_b2ParticleGroup_GetMass_0 = function () {
        return (xy = a._emscripten_bind_b2ParticleGroup_GetMass_0 =
          a.asm.dw).apply(null, arguments);
      }),
      yy = (a._emscripten_bind_b2ParticleGroup_GetInertia_0 = function () {
        return (yy = a._emscripten_bind_b2ParticleGroup_GetInertia_0 =
          a.asm.ew).apply(null, arguments);
      }),
      zy = (a._emscripten_bind_b2ParticleGroup_GetCenter_0 = function () {
        return (zy = a._emscripten_bind_b2ParticleGroup_GetCenter_0 =
          a.asm.fw).apply(null, arguments);
      }),
      Ay = (a._emscripten_bind_b2ParticleGroup_GetLinearVelocity_0 =
        function () {
          return (Ay = a._emscripten_bind_b2ParticleGroup_GetLinearVelocity_0 =
            a.asm.gw).apply(null, arguments);
        }),
      By = (a._emscripten_bind_b2ParticleGroup_GetAngularVelocity_0 =
        function () {
          return (By = a._emscripten_bind_b2ParticleGroup_GetAngularVelocity_0 =
            a.asm.hw).apply(null, arguments);
        }),
      Cy = (a._emscripten_bind_b2ParticleGroup_GetTransform_0 = function () {
        return (Cy = a._emscripten_bind_b2ParticleGroup_GetTransform_0 =
          a.asm.iw).apply(null, arguments);
      }),
      Dy = (a._emscripten_bind_b2ParticleGroup_GetPosition_0 = function () {
        return (Dy = a._emscripten_bind_b2ParticleGroup_GetPosition_0 =
          a.asm.jw).apply(null, arguments);
      }),
      Ey = (a._emscripten_bind_b2ParticleGroup_GetAngle_0 = function () {
        return (Ey = a._emscripten_bind_b2ParticleGroup_GetAngle_0 =
          a.asm.kw).apply(null, arguments);
      }),
      Fy =
        (a._emscripten_bind_b2ParticleGroup_GetLinearVelocityFromWorldPoint_1 =
          function () {
            return (Fy =
              a._emscripten_bind_b2ParticleGroup_GetLinearVelocityFromWorldPoint_1 =
                a.asm.lw).apply(null, arguments);
          }),
      Gy = (a._emscripten_bind_b2ParticleGroup_GetUserData_0 = function () {
        return (Gy = a._emscripten_bind_b2ParticleGroup_GetUserData_0 =
          a.asm.mw).apply(null, arguments);
      }),
      Hy = (a._emscripten_bind_b2ParticleGroup_SetUserData_1 = function () {
        return (Hy = a._emscripten_bind_b2ParticleGroup_SetUserData_1 =
          a.asm.nw).apply(null, arguments);
      }),
      Iy = (a._emscripten_bind_b2ParticleGroup_ApplyForce_1 = function () {
        return (Iy = a._emscripten_bind_b2ParticleGroup_ApplyForce_1 =
          a.asm.ow).apply(null, arguments);
      }),
      Jy = (a._emscripten_bind_b2ParticleGroup_ApplyLinearImpulse_1 =
        function () {
          return (Jy = a._emscripten_bind_b2ParticleGroup_ApplyLinearImpulse_1 =
            a.asm.pw).apply(null, arguments);
        }),
      Ky = (a._emscripten_bind_b2ParticleGroup_DestroyParticles_0 =
        function () {
          return (Ky = a._emscripten_bind_b2ParticleGroup_DestroyParticles_0 =
            a.asm.qw).apply(null, arguments);
        }),
      Ly = (a._emscripten_bind_b2ParticleGroup_DestroyParticles_1 =
        function () {
          return (Ly = a._emscripten_bind_b2ParticleGroup_DestroyParticles_1 =
            a.asm.rw).apply(null, arguments);
        }),
      My = (a._emscripten_bind_b2ParticleContact_b2ParticleContact_0 =
        function () {
          return (My =
            a._emscripten_bind_b2ParticleContact_b2ParticleContact_0 =
              a.asm.sw).apply(null, arguments);
        }),
      Ny = (a._emscripten_bind_b2ParticleContact_SetIndices_2 = function () {
        return (Ny = a._emscripten_bind_b2ParticleContact_SetIndices_2 =
          a.asm.tw).apply(null, arguments);
      }),
      Oy = (a._emscripten_bind_b2ParticleContact_SetWeight_1 = function () {
        return (Oy = a._emscripten_bind_b2ParticleContact_SetWeight_1 =
          a.asm.uw).apply(null, arguments);
      }),
      Py = (a._emscripten_bind_b2ParticleContact_SetNormal_1 = function () {
        return (Py = a._emscripten_bind_b2ParticleContact_SetNormal_1 =
          a.asm.vw).apply(null, arguments);
      }),
      Qy = (a._emscripten_bind_b2ParticleContact_SetFlags_1 = function () {
        return (Qy = a._emscripten_bind_b2ParticleContact_SetFlags_1 =
          a.asm.ww).apply(null, arguments);
      }),
      Ry = (a._emscripten_bind_b2ParticleContact_GetIndexA_0 = function () {
        return (Ry = a._emscripten_bind_b2ParticleContact_GetIndexA_0 =
          a.asm.xw).apply(null, arguments);
      }),
      Sy = (a._emscripten_bind_b2ParticleContact_GetIndexB_0 = function () {
        return (Sy = a._emscripten_bind_b2ParticleContact_GetIndexB_0 =
          a.asm.yw).apply(null, arguments);
      }),
      Ty = (a._emscripten_bind_b2ParticleContact_GetWeight_0 = function () {
        return (Ty = a._emscripten_bind_b2ParticleContact_GetWeight_0 =
          a.asm.zw).apply(null, arguments);
      }),
      Uy = (a._emscripten_bind_b2ParticleContact_GetNormal_0 = function () {
        return (Uy = a._emscripten_bind_b2ParticleContact_GetNormal_0 =
          a.asm.Aw).apply(null, arguments);
      }),
      Vy = (a._emscripten_bind_b2ParticleContact_GetFlags_0 = function () {
        return (Vy = a._emscripten_bind_b2ParticleContact_GetFlags_0 =
          a.asm.Bw).apply(null, arguments);
      }),
      Wy = (a._emscripten_bind_b2ParticleContact_op_eq_1 = function () {
        return (Wy = a._emscripten_bind_b2ParticleContact_op_eq_1 =
          a.asm.Cw).apply(null, arguments);
      }),
      Xy = (a._emscripten_bind_b2ParticleContact_op_neq_1 = function () {
        return (Xy = a._emscripten_bind_b2ParticleContact_op_neq_1 =
          a.asm.Dw).apply(null, arguments);
      }),
      Yy = (a._emscripten_bind_b2ParticleContact_ApproximatelyEqual_1 =
        function () {
          return (Yy =
            a._emscripten_bind_b2ParticleContact_ApproximatelyEqual_1 =
              a.asm.Ew).apply(null, arguments);
        }),
      Zy = (a._emscripten_bind_b2ParticleContact___destroy___0 = function () {
        return (Zy = a._emscripten_bind_b2ParticleContact___destroy___0 =
          a.asm.Fw).apply(null, arguments);
      }),
      $y = (a._emscripten_bind_b2ParticleBodyContact_b2ParticleBodyContact_0 =
        function () {
          return ($y =
            a._emscripten_bind_b2ParticleBodyContact_b2ParticleBodyContact_0 =
              a.asm.Gw).apply(null, arguments);
        }),
      az = (a._emscripten_bind_b2ParticleBodyContact_get_index_0 = function () {
        return (az = a._emscripten_bind_b2ParticleBodyContact_get_index_0 =
          a.asm.Hw).apply(null, arguments);
      }),
      bz = (a._emscripten_bind_b2ParticleBodyContact_set_index_1 = function () {
        return (bz = a._emscripten_bind_b2ParticleBodyContact_set_index_1 =
          a.asm.Iw).apply(null, arguments);
      }),
      cz = (a._emscripten_bind_b2ParticleBodyContact_get_body_0 = function () {
        return (cz = a._emscripten_bind_b2ParticleBodyContact_get_body_0 =
          a.asm.Jw).apply(null, arguments);
      }),
      dz = (a._emscripten_bind_b2ParticleBodyContact_set_body_1 = function () {
        return (dz = a._emscripten_bind_b2ParticleBodyContact_set_body_1 =
          a.asm.Kw).apply(null, arguments);
      }),
      ez = (a._emscripten_bind_b2ParticleBodyContact_get_fixture_0 =
        function () {
          return (ez = a._emscripten_bind_b2ParticleBodyContact_get_fixture_0 =
            a.asm.Lw).apply(null, arguments);
        }),
      fz = (a._emscripten_bind_b2ParticleBodyContact_set_fixture_1 =
        function () {
          return (fz = a._emscripten_bind_b2ParticleBodyContact_set_fixture_1 =
            a.asm.Mw).apply(null, arguments);
        }),
      gz = (a._emscripten_bind_b2ParticleBodyContact_get_weight_0 =
        function () {
          return (gz = a._emscripten_bind_b2ParticleBodyContact_get_weight_0 =
            a.asm.Nw).apply(null, arguments);
        }),
      hz = (a._emscripten_bind_b2ParticleBodyContact_set_weight_1 =
        function () {
          return (hz = a._emscripten_bind_b2ParticleBodyContact_set_weight_1 =
            a.asm.Ow).apply(null, arguments);
        }),
      iz = (a._emscripten_bind_b2ParticleBodyContact_get_normal_0 =
        function () {
          return (iz = a._emscripten_bind_b2ParticleBodyContact_get_normal_0 =
            a.asm.Pw).apply(null, arguments);
        }),
      jz = (a._emscripten_bind_b2ParticleBodyContact_set_normal_1 =
        function () {
          return (jz = a._emscripten_bind_b2ParticleBodyContact_set_normal_1 =
            a.asm.Qw).apply(null, arguments);
        }),
      kz = (a._emscripten_bind_b2ParticleBodyContact_get_mass_0 = function () {
        return (kz = a._emscripten_bind_b2ParticleBodyContact_get_mass_0 =
          a.asm.Rw).apply(null, arguments);
      }),
      lz = (a._emscripten_bind_b2ParticleBodyContact_set_mass_1 = function () {
        return (lz = a._emscripten_bind_b2ParticleBodyContact_set_mass_1 =
          a.asm.Sw).apply(null, arguments);
      }),
      mz = (a._emscripten_bind_b2ParticleBodyContact___destroy___0 =
        function () {
          return (mz = a._emscripten_bind_b2ParticleBodyContact___destroy___0 =
            a.asm.Tw).apply(null, arguments);
        }),
      nz = (a._emscripten_bind_b2ParticlePair_b2ParticlePair_0 = function () {
        return (nz = a._emscripten_bind_b2ParticlePair_b2ParticlePair_0 =
          a.asm.Uw).apply(null, arguments);
      }),
      oz = (a._emscripten_bind_b2ParticlePair_get_indexA_0 = function () {
        return (oz = a._emscripten_bind_b2ParticlePair_get_indexA_0 =
          a.asm.Vw).apply(null, arguments);
      }),
      pz = (a._emscripten_bind_b2ParticlePair_set_indexA_1 = function () {
        return (pz = a._emscripten_bind_b2ParticlePair_set_indexA_1 =
          a.asm.Ww).apply(null, arguments);
      }),
      qz = (a._emscripten_bind_b2ParticlePair_get_indexB_0 = function () {
        return (qz = a._emscripten_bind_b2ParticlePair_get_indexB_0 =
          a.asm.Xw).apply(null, arguments);
      }),
      rz = (a._emscripten_bind_b2ParticlePair_set_indexB_1 = function () {
        return (rz = a._emscripten_bind_b2ParticlePair_set_indexB_1 =
          a.asm.Yw).apply(null, arguments);
      }),
      sz = (a._emscripten_bind_b2ParticlePair_get_flags_0 = function () {
        return (sz = a._emscripten_bind_b2ParticlePair_get_flags_0 =
          a.asm.Zw).apply(null, arguments);
      }),
      tz = (a._emscripten_bind_b2ParticlePair_set_flags_1 = function () {
        return (tz = a._emscripten_bind_b2ParticlePair_set_flags_1 =
          a.asm._w).apply(null, arguments);
      }),
      uz = (a._emscripten_bind_b2ParticlePair_get_strength_0 = function () {
        return (uz = a._emscripten_bind_b2ParticlePair_get_strength_0 =
          a.asm.$w).apply(null, arguments);
      }),
      vz = (a._emscripten_bind_b2ParticlePair_set_strength_1 = function () {
        return (vz = a._emscripten_bind_b2ParticlePair_set_strength_1 =
          a.asm.ax).apply(null, arguments);
      }),
      wz = (a._emscripten_bind_b2ParticlePair_get_distance_0 = function () {
        return (wz = a._emscripten_bind_b2ParticlePair_get_distance_0 =
          a.asm.bx).apply(null, arguments);
      }),
      xz = (a._emscripten_bind_b2ParticlePair_set_distance_1 = function () {
        return (xz = a._emscripten_bind_b2ParticlePair_set_distance_1 =
          a.asm.cx).apply(null, arguments);
      }),
      yz = (a._emscripten_bind_b2ParticlePair___destroy___0 = function () {
        return (yz = a._emscripten_bind_b2ParticlePair___destroy___0 =
          a.asm.dx).apply(null, arguments);
      }),
      zz = (a._emscripten_bind_b2ParticleTriad_b2ParticleTriad_0 = function () {
        return (zz = a._emscripten_bind_b2ParticleTriad_b2ParticleTriad_0 =
          a.asm.ex).apply(null, arguments);
      }),
      Az = (a._emscripten_bind_b2ParticleTriad_get_indexA_0 = function () {
        return (Az = a._emscripten_bind_b2ParticleTriad_get_indexA_0 =
          a.asm.fx).apply(null, arguments);
      }),
      Bz = (a._emscripten_bind_b2ParticleTriad_set_indexA_1 = function () {
        return (Bz = a._emscripten_bind_b2ParticleTriad_set_indexA_1 =
          a.asm.gx).apply(null, arguments);
      }),
      Cz = (a._emscripten_bind_b2ParticleTriad_get_indexB_0 = function () {
        return (Cz = a._emscripten_bind_b2ParticleTriad_get_indexB_0 =
          a.asm.hx).apply(null, arguments);
      }),
      Dz = (a._emscripten_bind_b2ParticleTriad_set_indexB_1 = function () {
        return (Dz = a._emscripten_bind_b2ParticleTriad_set_indexB_1 =
          a.asm.ix).apply(null, arguments);
      }),
      Ez = (a._emscripten_bind_b2ParticleTriad_get_indexC_0 = function () {
        return (Ez = a._emscripten_bind_b2ParticleTriad_get_indexC_0 =
          a.asm.jx).apply(null, arguments);
      }),
      Fz = (a._emscripten_bind_b2ParticleTriad_set_indexC_1 = function () {
        return (Fz = a._emscripten_bind_b2ParticleTriad_set_indexC_1 =
          a.asm.kx).apply(null, arguments);
      }),
      Gz = (a._emscripten_bind_b2ParticleTriad_get_flags_0 = function () {
        return (Gz = a._emscripten_bind_b2ParticleTriad_get_flags_0 =
          a.asm.lx).apply(null, arguments);
      }),
      Hz = (a._emscripten_bind_b2ParticleTriad_set_flags_1 = function () {
        return (Hz = a._emscripten_bind_b2ParticleTriad_set_flags_1 =
          a.asm.mx).apply(null, arguments);
      }),
      Iz = (a._emscripten_bind_b2ParticleTriad_get_strength_0 = function () {
        return (Iz = a._emscripten_bind_b2ParticleTriad_get_strength_0 =
          a.asm.nx).apply(null, arguments);
      }),
      Jz = (a._emscripten_bind_b2ParticleTriad_set_strength_1 = function () {
        return (Jz = a._emscripten_bind_b2ParticleTriad_set_strength_1 =
          a.asm.ox).apply(null, arguments);
      }),
      Kz = (a._emscripten_bind_b2ParticleTriad_get_pa_0 = function () {
        return (Kz = a._emscripten_bind_b2ParticleTriad_get_pa_0 =
          a.asm.px).apply(null, arguments);
      }),
      Lz = (a._emscripten_bind_b2ParticleTriad_set_pa_1 = function () {
        return (Lz = a._emscripten_bind_b2ParticleTriad_set_pa_1 =
          a.asm.qx).apply(null, arguments);
      }),
      Mz = (a._emscripten_bind_b2ParticleTriad_get_pb_0 = function () {
        return (Mz = a._emscripten_bind_b2ParticleTriad_get_pb_0 =
          a.asm.rx).apply(null, arguments);
      }),
      Nz = (a._emscripten_bind_b2ParticleTriad_set_pb_1 = function () {
        return (Nz = a._emscripten_bind_b2ParticleTriad_set_pb_1 =
          a.asm.sx).apply(null, arguments);
      }),
      Oz = (a._emscripten_bind_b2ParticleTriad_get_pc_0 = function () {
        return (Oz = a._emscripten_bind_b2ParticleTriad_get_pc_0 =
          a.asm.tx).apply(null, arguments);
      }),
      Pz = (a._emscripten_bind_b2ParticleTriad_set_pc_1 = function () {
        return (Pz = a._emscripten_bind_b2ParticleTriad_set_pc_1 =
          a.asm.ux).apply(null, arguments);
      }),
      Qz = (a._emscripten_bind_b2ParticleTriad_get_ka_0 = function () {
        return (Qz = a._emscripten_bind_b2ParticleTriad_get_ka_0 =
          a.asm.vx).apply(null, arguments);
      }),
      Rz = (a._emscripten_bind_b2ParticleTriad_set_ka_1 = function () {
        return (Rz = a._emscripten_bind_b2ParticleTriad_set_ka_1 =
          a.asm.wx).apply(null, arguments);
      }),
      Sz = (a._emscripten_bind_b2ParticleTriad_get_kb_0 = function () {
        return (Sz = a._emscripten_bind_b2ParticleTriad_get_kb_0 =
          a.asm.xx).apply(null, arguments);
      }),
      Tz = (a._emscripten_bind_b2ParticleTriad_set_kb_1 = function () {
        return (Tz = a._emscripten_bind_b2ParticleTriad_set_kb_1 =
          a.asm.yx).apply(null, arguments);
      }),
      Uz = (a._emscripten_bind_b2ParticleTriad_get_kc_0 = function () {
        return (Uz = a._emscripten_bind_b2ParticleTriad_get_kc_0 =
          a.asm.zx).apply(null, arguments);
      }),
      Vz = (a._emscripten_bind_b2ParticleTriad_set_kc_1 = function () {
        return (Vz = a._emscripten_bind_b2ParticleTriad_set_kc_1 =
          a.asm.Ax).apply(null, arguments);
      }),
      Wz = (a._emscripten_bind_b2ParticleTriad_get_s_0 = function () {
        return (Wz = a._emscripten_bind_b2ParticleTriad_get_s_0 =
          a.asm.Bx).apply(null, arguments);
      }),
      Xz = (a._emscripten_bind_b2ParticleTriad_set_s_1 = function () {
        return (Xz = a._emscripten_bind_b2ParticleTriad_set_s_1 =
          a.asm.Cx).apply(null, arguments);
      }),
      Yz = (a._emscripten_bind_b2ParticleTriad___destroy___0 = function () {
        return (Yz = a._emscripten_bind_b2ParticleTriad___destroy___0 =
          a.asm.Dx).apply(null, arguments);
      }),
      Zz = (a._emscripten_bind_b2ParticleSystemDef_b2ParticleSystemDef_0 =
        function () {
          return (Zz =
            a._emscripten_bind_b2ParticleSystemDef_b2ParticleSystemDef_0 =
              a.asm.Ex).apply(null, arguments);
        }),
      $z = (a._emscripten_bind_b2ParticleSystemDef_get_strictContactCheck_0 =
        function () {
          return ($z =
            a._emscripten_bind_b2ParticleSystemDef_get_strictContactCheck_0 =
              a.asm.Fx).apply(null, arguments);
        }),
      aA = (a._emscripten_bind_b2ParticleSystemDef_set_strictContactCheck_1 =
        function () {
          return (aA =
            a._emscripten_bind_b2ParticleSystemDef_set_strictContactCheck_1 =
              a.asm.Gx).apply(null, arguments);
        }),
      bA = (a._emscripten_bind_b2ParticleSystemDef_get_density_0 = function () {
        return (bA = a._emscripten_bind_b2ParticleSystemDef_get_density_0 =
          a.asm.Hx).apply(null, arguments);
      }),
      cA = (a._emscripten_bind_b2ParticleSystemDef_set_density_1 = function () {
        return (cA = a._emscripten_bind_b2ParticleSystemDef_set_density_1 =
          a.asm.Ix).apply(null, arguments);
      }),
      dA = (a._emscripten_bind_b2ParticleSystemDef_get_gravityScale_0 =
        function () {
          return (dA =
            a._emscripten_bind_b2ParticleSystemDef_get_gravityScale_0 =
              a.asm.Jx).apply(null, arguments);
        }),
      eA = (a._emscripten_bind_b2ParticleSystemDef_set_gravityScale_1 =
        function () {
          return (eA =
            a._emscripten_bind_b2ParticleSystemDef_set_gravityScale_1 =
              a.asm.Kx).apply(null, arguments);
        }),
      fA = (a._emscripten_bind_b2ParticleSystemDef_get_radius_0 = function () {
        return (fA = a._emscripten_bind_b2ParticleSystemDef_get_radius_0 =
          a.asm.Lx).apply(null, arguments);
      }),
      gA = (a._emscripten_bind_b2ParticleSystemDef_set_radius_1 = function () {
        return (gA = a._emscripten_bind_b2ParticleSystemDef_set_radius_1 =
          a.asm.Mx).apply(null, arguments);
      }),
      hA = (a._emscripten_bind_b2ParticleSystemDef_get_maxCount_0 =
        function () {
          return (hA = a._emscripten_bind_b2ParticleSystemDef_get_maxCount_0 =
            a.asm.Nx).apply(null, arguments);
        }),
      iA = (a._emscripten_bind_b2ParticleSystemDef_set_maxCount_1 =
        function () {
          return (iA = a._emscripten_bind_b2ParticleSystemDef_set_maxCount_1 =
            a.asm.Ox).apply(null, arguments);
        }),
      jA = (a._emscripten_bind_b2ParticleSystemDef_get_pressureStrength_0 =
        function () {
          return (jA =
            a._emscripten_bind_b2ParticleSystemDef_get_pressureStrength_0 =
              a.asm.Px).apply(null, arguments);
        }),
      kA = (a._emscripten_bind_b2ParticleSystemDef_set_pressureStrength_1 =
        function () {
          return (kA =
            a._emscripten_bind_b2ParticleSystemDef_set_pressureStrength_1 =
              a.asm.Qx).apply(null, arguments);
        }),
      lA = (a._emscripten_bind_b2ParticleSystemDef_get_dampingStrength_0 =
        function () {
          return (lA =
            a._emscripten_bind_b2ParticleSystemDef_get_dampingStrength_0 =
              a.asm.Rx).apply(null, arguments);
        }),
      mA = (a._emscripten_bind_b2ParticleSystemDef_set_dampingStrength_1 =
        function () {
          return (mA =
            a._emscripten_bind_b2ParticleSystemDef_set_dampingStrength_1 =
              a.asm.Sx).apply(null, arguments);
        }),
      nA = (a._emscripten_bind_b2ParticleSystemDef_get_elasticStrength_0 =
        function () {
          return (nA =
            a._emscripten_bind_b2ParticleSystemDef_get_elasticStrength_0 =
              a.asm.Tx).apply(null, arguments);
        }),
      oA = (a._emscripten_bind_b2ParticleSystemDef_set_elasticStrength_1 =
        function () {
          return (oA =
            a._emscripten_bind_b2ParticleSystemDef_set_elasticStrength_1 =
              a.asm.Ux).apply(null, arguments);
        }),
      pA = (a._emscripten_bind_b2ParticleSystemDef_get_springStrength_0 =
        function () {
          return (pA =
            a._emscripten_bind_b2ParticleSystemDef_get_springStrength_0 =
              a.asm.Vx).apply(null, arguments);
        }),
      qA = (a._emscripten_bind_b2ParticleSystemDef_set_springStrength_1 =
        function () {
          return (qA =
            a._emscripten_bind_b2ParticleSystemDef_set_springStrength_1 =
              a.asm.Wx).apply(null, arguments);
        }),
      rA = (a._emscripten_bind_b2ParticleSystemDef_get_viscousStrength_0 =
        function () {
          return (rA =
            a._emscripten_bind_b2ParticleSystemDef_get_viscousStrength_0 =
              a.asm.Xx).apply(null, arguments);
        }),
      sA = (a._emscripten_bind_b2ParticleSystemDef_set_viscousStrength_1 =
        function () {
          return (sA =
            a._emscripten_bind_b2ParticleSystemDef_set_viscousStrength_1 =
              a.asm.Yx).apply(null, arguments);
        }),
      tA =
        (a._emscripten_bind_b2ParticleSystemDef_get_surfaceTensionPressureStrength_0 =
          function () {
            return (tA =
              a._emscripten_bind_b2ParticleSystemDef_get_surfaceTensionPressureStrength_0 =
                a.asm.Zx).apply(null, arguments);
          }),
      uA =
        (a._emscripten_bind_b2ParticleSystemDef_set_surfaceTensionPressureStrength_1 =
          function () {
            return (uA =
              a._emscripten_bind_b2ParticleSystemDef_set_surfaceTensionPressureStrength_1 =
                a.asm._x).apply(null, arguments);
          }),
      vA =
        (a._emscripten_bind_b2ParticleSystemDef_get_surfaceTensionNormalStrength_0 =
          function () {
            return (vA =
              a._emscripten_bind_b2ParticleSystemDef_get_surfaceTensionNormalStrength_0 =
                a.asm.$x).apply(null, arguments);
          }),
      wA =
        (a._emscripten_bind_b2ParticleSystemDef_set_surfaceTensionNormalStrength_1 =
          function () {
            return (wA =
              a._emscripten_bind_b2ParticleSystemDef_set_surfaceTensionNormalStrength_1 =
                a.asm.ay).apply(null, arguments);
          }),
      xA = (a._emscripten_bind_b2ParticleSystemDef_get_repulsiveStrength_0 =
        function () {
          return (xA =
            a._emscripten_bind_b2ParticleSystemDef_get_repulsiveStrength_0 =
              a.asm.by).apply(null, arguments);
        }),
      yA = (a._emscripten_bind_b2ParticleSystemDef_set_repulsiveStrength_1 =
        function () {
          return (yA =
            a._emscripten_bind_b2ParticleSystemDef_set_repulsiveStrength_1 =
              a.asm.cy).apply(null, arguments);
        }),
      zA = (a._emscripten_bind_b2ParticleSystemDef_get_powderStrength_0 =
        function () {
          return (zA =
            a._emscripten_bind_b2ParticleSystemDef_get_powderStrength_0 =
              a.asm.dy).apply(null, arguments);
        }),
      AA = (a._emscripten_bind_b2ParticleSystemDef_set_powderStrength_1 =
        function () {
          return (AA =
            a._emscripten_bind_b2ParticleSystemDef_set_powderStrength_1 =
              a.asm.ey).apply(null, arguments);
        }),
      BA = (a._emscripten_bind_b2ParticleSystemDef_get_ejectionStrength_0 =
        function () {
          return (BA =
            a._emscripten_bind_b2ParticleSystemDef_get_ejectionStrength_0 =
              a.asm.fy).apply(null, arguments);
        }),
      CA = (a._emscripten_bind_b2ParticleSystemDef_set_ejectionStrength_1 =
        function () {
          return (CA =
            a._emscripten_bind_b2ParticleSystemDef_set_ejectionStrength_1 =
              a.asm.gy).apply(null, arguments);
        }),
      DA =
        (a._emscripten_bind_b2ParticleSystemDef_get_staticPressureStrength_0 =
          function () {
            return (DA =
              a._emscripten_bind_b2ParticleSystemDef_get_staticPressureStrength_0 =
                a.asm.hy).apply(null, arguments);
          }),
      EA =
        (a._emscripten_bind_b2ParticleSystemDef_set_staticPressureStrength_1 =
          function () {
            return (EA =
              a._emscripten_bind_b2ParticleSystemDef_set_staticPressureStrength_1 =
                a.asm.iy).apply(null, arguments);
          }),
      FA =
        (a._emscripten_bind_b2ParticleSystemDef_get_staticPressureRelaxation_0 =
          function () {
            return (FA =
              a._emscripten_bind_b2ParticleSystemDef_get_staticPressureRelaxation_0 =
                a.asm.jy).apply(null, arguments);
          }),
      GA =
        (a._emscripten_bind_b2ParticleSystemDef_set_staticPressureRelaxation_1 =
          function () {
            return (GA =
              a._emscripten_bind_b2ParticleSystemDef_set_staticPressureRelaxation_1 =
                a.asm.ky).apply(null, arguments);
          }),
      HA =
        (a._emscripten_bind_b2ParticleSystemDef_get_staticPressureIterations_0 =
          function () {
            return (HA =
              a._emscripten_bind_b2ParticleSystemDef_get_staticPressureIterations_0 =
                a.asm.ly).apply(null, arguments);
          }),
      IA =
        (a._emscripten_bind_b2ParticleSystemDef_set_staticPressureIterations_1 =
          function () {
            return (IA =
              a._emscripten_bind_b2ParticleSystemDef_set_staticPressureIterations_1 =
                a.asm.my).apply(null, arguments);
          }),
      JA = (a._emscripten_bind_b2ParticleSystemDef_get_colorMixingStrength_0 =
        function () {
          return (JA =
            a._emscripten_bind_b2ParticleSystemDef_get_colorMixingStrength_0 =
              a.asm.ny).apply(null, arguments);
        }),
      KA = (a._emscripten_bind_b2ParticleSystemDef_set_colorMixingStrength_1 =
        function () {
          return (KA =
            a._emscripten_bind_b2ParticleSystemDef_set_colorMixingStrength_1 =
              a.asm.oy).apply(null, arguments);
        }),
      LA = (a._emscripten_bind_b2ParticleSystemDef_get_destroyByAge_0 =
        function () {
          return (LA =
            a._emscripten_bind_b2ParticleSystemDef_get_destroyByAge_0 =
              a.asm.py).apply(null, arguments);
        }),
      MA = (a._emscripten_bind_b2ParticleSystemDef_set_destroyByAge_1 =
        function () {
          return (MA =
            a._emscripten_bind_b2ParticleSystemDef_set_destroyByAge_1 =
              a.asm.qy).apply(null, arguments);
        }),
      NA = (a._emscripten_bind_b2ParticleSystemDef_get_lifetimeGranularity_0 =
        function () {
          return (NA =
            a._emscripten_bind_b2ParticleSystemDef_get_lifetimeGranularity_0 =
              a.asm.ry).apply(null, arguments);
        }),
      OA = (a._emscripten_bind_b2ParticleSystemDef_set_lifetimeGranularity_1 =
        function () {
          return (OA =
            a._emscripten_bind_b2ParticleSystemDef_set_lifetimeGranularity_1 =
              a.asm.sy).apply(null, arguments);
        }),
      PA = (a._emscripten_bind_b2ParticleSystemDef___destroy___0 = function () {
        return (PA = a._emscripten_bind_b2ParticleSystemDef___destroy___0 =
          a.asm.ty).apply(null, arguments);
      }),
      QA = (a._emscripten_bind_b2ParticleSystem_CreateParticle_1 = function () {
        return (QA = a._emscripten_bind_b2ParticleSystem_CreateParticle_1 =
          a.asm.uy).apply(null, arguments);
      }),
      RA = (a._emscripten_bind_b2ParticleSystem_GetParticleHandleFromIndex_1 =
        function () {
          return (RA =
            a._emscripten_bind_b2ParticleSystem_GetParticleHandleFromIndex_1 =
              a.asm.vy).apply(null, arguments);
        }),
      SA = (a._emscripten_bind_b2ParticleSystem_DestroyParticle_1 =
        function () {
          return (SA = a._emscripten_bind_b2ParticleSystem_DestroyParticle_1 =
            a.asm.wy).apply(null, arguments);
        }),
      TA = (a._emscripten_bind_b2ParticleSystem_DestroyParticle_2 =
        function () {
          return (TA = a._emscripten_bind_b2ParticleSystem_DestroyParticle_2 =
            a.asm.xy).apply(null, arguments);
        }),
      UA = (a._emscripten_bind_b2ParticleSystem_DestroyOldestParticle_2 =
        function () {
          return (UA =
            a._emscripten_bind_b2ParticleSystem_DestroyOldestParticle_2 =
              a.asm.yy).apply(null, arguments);
        }),
      VA = (a._emscripten_bind_b2ParticleSystem_DestroyParticlesInShape_2 =
        function () {
          return (VA =
            a._emscripten_bind_b2ParticleSystem_DestroyParticlesInShape_2 =
              a.asm.zy).apply(null, arguments);
        }),
      WA = (a._emscripten_bind_b2ParticleSystem_DestroyParticlesInShape_3 =
        function () {
          return (WA =
            a._emscripten_bind_b2ParticleSystem_DestroyParticlesInShape_3 =
              a.asm.Ay).apply(null, arguments);
        }),
      XA = (a._emscripten_bind_b2ParticleSystem_CreateParticleGroup_1 =
        function () {
          return (XA =
            a._emscripten_bind_b2ParticleSystem_CreateParticleGroup_1 =
              a.asm.By).apply(null, arguments);
        }),
      YA = (a._emscripten_bind_b2ParticleSystem_JoinParticleGroups_2 =
        function () {
          return (YA =
            a._emscripten_bind_b2ParticleSystem_JoinParticleGroups_2 =
              a.asm.Cy).apply(null, arguments);
        }),
      ZA = (a._emscripten_bind_b2ParticleSystem_SplitParticleGroup_1 =
        function () {
          return (ZA =
            a._emscripten_bind_b2ParticleSystem_SplitParticleGroup_1 =
              a.asm.Dy).apply(null, arguments);
        }),
      $A = (a._emscripten_bind_b2ParticleSystem_GetParticleGroupList_0 =
        function () {
          return ($A =
            a._emscripten_bind_b2ParticleSystem_GetParticleGroupList_0 =
              a.asm.Ey).apply(null, arguments);
        }),
      aB = (a._emscripten_bind_b2ParticleSystem_GetParticleGroupCount_0 =
        function () {
          return (aB =
            a._emscripten_bind_b2ParticleSystem_GetParticleGroupCount_0 =
              a.asm.Fy).apply(null, arguments);
        }),
      bB = (a._emscripten_bind_b2ParticleSystem_GetParticleCount_0 =
        function () {
          return (bB = a._emscripten_bind_b2ParticleSystem_GetParticleCount_0 =
            a.asm.Gy).apply(null, arguments);
        }),
      cB = (a._emscripten_bind_b2ParticleSystem_GetMaxParticleCount_0 =
        function () {
          return (cB =
            a._emscripten_bind_b2ParticleSystem_GetMaxParticleCount_0 =
              a.asm.Hy).apply(null, arguments);
        }),
      dB = (a._emscripten_bind_b2ParticleSystem_SetMaxParticleCount_1 =
        function () {
          return (dB =
            a._emscripten_bind_b2ParticleSystem_SetMaxParticleCount_1 =
              a.asm.Iy).apply(null, arguments);
        }),
      eB = (a._emscripten_bind_b2ParticleSystem_GetAllParticleFlags_0 =
        function () {
          return (eB =
            a._emscripten_bind_b2ParticleSystem_GetAllParticleFlags_0 =
              a.asm.Jy).apply(null, arguments);
        }),
      fB = (a._emscripten_bind_b2ParticleSystem_GetAllGroupFlags_0 =
        function () {
          return (fB = a._emscripten_bind_b2ParticleSystem_GetAllGroupFlags_0 =
            a.asm.Ky).apply(null, arguments);
        }),
      gB = (a._emscripten_bind_b2ParticleSystem_SetPaused_1 = function () {
        return (gB = a._emscripten_bind_b2ParticleSystem_SetPaused_1 =
          a.asm.Ly).apply(null, arguments);
      }),
      hB = (a._emscripten_bind_b2ParticleSystem_GetPaused_0 = function () {
        return (hB = a._emscripten_bind_b2ParticleSystem_GetPaused_0 =
          a.asm.My).apply(null, arguments);
      }),
      iB = (a._emscripten_bind_b2ParticleSystem_SetDensity_1 = function () {
        return (iB = a._emscripten_bind_b2ParticleSystem_SetDensity_1 =
          a.asm.Ny).apply(null, arguments);
      }),
      jB = (a._emscripten_bind_b2ParticleSystem_GetDensity_0 = function () {
        return (jB = a._emscripten_bind_b2ParticleSystem_GetDensity_0 =
          a.asm.Oy).apply(null, arguments);
      }),
      kB = (a._emscripten_bind_b2ParticleSystem_SetGravityScale_1 =
        function () {
          return (kB = a._emscripten_bind_b2ParticleSystem_SetGravityScale_1 =
            a.asm.Py).apply(null, arguments);
        }),
      lB = (a._emscripten_bind_b2ParticleSystem_GetGravityScale_0 =
        function () {
          return (lB = a._emscripten_bind_b2ParticleSystem_GetGravityScale_0 =
            a.asm.Qy).apply(null, arguments);
        }),
      mB = (a._emscripten_bind_b2ParticleSystem_SetDamping_1 = function () {
        return (mB = a._emscripten_bind_b2ParticleSystem_SetDamping_1 =
          a.asm.Ry).apply(null, arguments);
      }),
      nB = (a._emscripten_bind_b2ParticleSystem_GetDamping_0 = function () {
        return (nB = a._emscripten_bind_b2ParticleSystem_GetDamping_0 =
          a.asm.Sy).apply(null, arguments);
      }),
      oB = (a._emscripten_bind_b2ParticleSystem_SetStaticPressureIterations_1 =
        function () {
          return (oB =
            a._emscripten_bind_b2ParticleSystem_SetStaticPressureIterations_1 =
              a.asm.Ty).apply(null, arguments);
        }),
      pB = (a._emscripten_bind_b2ParticleSystem_GetStaticPressureIterations_0 =
        function () {
          return (pB =
            a._emscripten_bind_b2ParticleSystem_GetStaticPressureIterations_0 =
              a.asm.Uy).apply(null, arguments);
        }),
      qB = (a._emscripten_bind_b2ParticleSystem_SetRadius_1 = function () {
        return (qB = a._emscripten_bind_b2ParticleSystem_SetRadius_1 =
          a.asm.Vy).apply(null, arguments);
      }),
      rB = (a._emscripten_bind_b2ParticleSystem_GetRadius_0 = function () {
        return (rB = a._emscripten_bind_b2ParticleSystem_GetRadius_0 =
          a.asm.Wy).apply(null, arguments);
      }),
      sB = (a._emscripten_bind_b2ParticleSystem_GetPositionBuffer_0 =
        function () {
          return (sB = a._emscripten_bind_b2ParticleSystem_GetPositionBuffer_0 =
            a.asm.Xy).apply(null, arguments);
        }),
      tB = (a._emscripten_bind_b2ParticleSystem_GetVelocityBuffer_0 =
        function () {
          return (tB = a._emscripten_bind_b2ParticleSystem_GetVelocityBuffer_0 =
            a.asm.Yy).apply(null, arguments);
        }),
      uB = (a._emscripten_bind_b2ParticleSystem_GetColorBuffer_0 = function () {
        return (uB = a._emscripten_bind_b2ParticleSystem_GetColorBuffer_0 =
          a.asm.Zy).apply(null, arguments);
      }),
      vB = (a._emscripten_bind_b2ParticleSystem_SetParticleFlags_2 =
        function () {
          return (vB = a._emscripten_bind_b2ParticleSystem_SetParticleFlags_2 =
            a.asm._y).apply(null, arguments);
        }),
      wB = (a._emscripten_bind_b2ParticleSystem_GetParticleFlags_1 =
        function () {
          return (wB = a._emscripten_bind_b2ParticleSystem_GetParticleFlags_1 =
            a.asm.$y).apply(null, arguments);
        }),
      xB = (a._emscripten_bind_b2ParticleSystem_SetPositionBuffer_2 =
        function () {
          return (xB = a._emscripten_bind_b2ParticleSystem_SetPositionBuffer_2 =
            a.asm.az).apply(null, arguments);
        }),
      yB = (a._emscripten_bind_b2ParticleSystem_SetVelocityBuffer_2 =
        function () {
          return (yB = a._emscripten_bind_b2ParticleSystem_SetVelocityBuffer_2 =
            a.asm.bz).apply(null, arguments);
        }),
      zB = (a._emscripten_bind_b2ParticleSystem_SetColorBuffer_2 = function () {
        return (zB = a._emscripten_bind_b2ParticleSystem_SetColorBuffer_2 =
          a.asm.cz).apply(null, arguments);
      }),
      AB = (a._emscripten_bind_b2ParticleSystem_GetContacts_0 = function () {
        return (AB = a._emscripten_bind_b2ParticleSystem_GetContacts_0 =
          a.asm.dz).apply(null, arguments);
      }),
      BB = (a._emscripten_bind_b2ParticleSystem_GetContactCount_0 =
        function () {
          return (BB = a._emscripten_bind_b2ParticleSystem_GetContactCount_0 =
            a.asm.ez).apply(null, arguments);
        }),
      CB = (a._emscripten_bind_b2ParticleSystem_GetBodyContacts_0 =
        function () {
          return (CB = a._emscripten_bind_b2ParticleSystem_GetBodyContacts_0 =
            a.asm.fz).apply(null, arguments);
        }),
      DB = (a._emscripten_bind_b2ParticleSystem_GetBodyContactCount_0 =
        function () {
          return (DB =
            a._emscripten_bind_b2ParticleSystem_GetBodyContactCount_0 =
              a.asm.gz).apply(null, arguments);
        }),
      EB = (a._emscripten_bind_b2ParticleSystem_GetPairs_0 = function () {
        return (EB = a._emscripten_bind_b2ParticleSystem_GetPairs_0 =
          a.asm.hz).apply(null, arguments);
      }),
      FB = (a._emscripten_bind_b2ParticleSystem_GetPairCount_0 = function () {
        return (FB = a._emscripten_bind_b2ParticleSystem_GetPairCount_0 =
          a.asm.iz).apply(null, arguments);
      }),
      GB = (a._emscripten_bind_b2ParticleSystem_GetTriads_0 = function () {
        return (GB = a._emscripten_bind_b2ParticleSystem_GetTriads_0 =
          a.asm.jz).apply(null, arguments);
      }),
      HB = (a._emscripten_bind_b2ParticleSystem_GetTriadCount_0 = function () {
        return (HB = a._emscripten_bind_b2ParticleSystem_GetTriadCount_0 =
          a.asm.kz).apply(null, arguments);
      }),
      IB = (a._emscripten_bind_b2ParticleSystem_SetStuckThreshold_1 =
        function () {
          return (IB = a._emscripten_bind_b2ParticleSystem_SetStuckThreshold_1 =
            a.asm.lz).apply(null, arguments);
        }),
      JB = (a._emscripten_bind_b2ParticleSystem_GetStuckCandidateCount_0 =
        function () {
          return (JB =
            a._emscripten_bind_b2ParticleSystem_GetStuckCandidateCount_0 =
              a.asm.mz).apply(null, arguments);
        }),
      KB = (a._emscripten_bind_b2ParticleSystem_ComputeCollisionEnergy_0 =
        function () {
          return (KB =
            a._emscripten_bind_b2ParticleSystem_ComputeCollisionEnergy_0 =
              a.asm.nz).apply(null, arguments);
        }),
      LB = (a._emscripten_bind_b2ParticleSystem_SetStrictContactCheck_1 =
        function () {
          return (LB =
            a._emscripten_bind_b2ParticleSystem_SetStrictContactCheck_1 =
              a.asm.oz).apply(null, arguments);
        }),
      MB = (a._emscripten_bind_b2ParticleSystem_GetStrictContactCheck_0 =
        function () {
          return (MB =
            a._emscripten_bind_b2ParticleSystem_GetStrictContactCheck_0 =
              a.asm.pz).apply(null, arguments);
        }),
      NB = (a._emscripten_bind_b2ParticleSystem_SetParticleLifetime_2 =
        function () {
          return (NB =
            a._emscripten_bind_b2ParticleSystem_SetParticleLifetime_2 =
              a.asm.qz).apply(null, arguments);
        }),
      OB = (a._emscripten_bind_b2ParticleSystem_GetParticleLifetime_1 =
        function () {
          return (OB =
            a._emscripten_bind_b2ParticleSystem_GetParticleLifetime_1 =
              a.asm.rz).apply(null, arguments);
        }),
      PB = (a._emscripten_bind_b2ParticleSystem_SetDestructionByAge_1 =
        function () {
          return (PB =
            a._emscripten_bind_b2ParticleSystem_SetDestructionByAge_1 =
              a.asm.sz).apply(null, arguments);
        }),
      QB = (a._emscripten_bind_b2ParticleSystem_GetDestructionByAge_0 =
        function () {
          return (QB =
            a._emscripten_bind_b2ParticleSystem_GetDestructionByAge_0 =
              a.asm.tz).apply(null, arguments);
        }),
      RB = (a._emscripten_bind_b2ParticleSystem_ExpirationTimeToLifetime_1 =
        function () {
          return (RB =
            a._emscripten_bind_b2ParticleSystem_ExpirationTimeToLifetime_1 =
              a.asm.uz).apply(null, arguments);
        }),
      SB = (a._emscripten_bind_b2ParticleSystem_ParticleApplyLinearImpulse_2 =
        function () {
          return (SB =
            a._emscripten_bind_b2ParticleSystem_ParticleApplyLinearImpulse_2 =
              a.asm.vz).apply(null, arguments);
        }),
      TB = (a._emscripten_bind_b2ParticleSystem_ApplyLinearImpulse_3 =
        function () {
          return (TB =
            a._emscripten_bind_b2ParticleSystem_ApplyLinearImpulse_3 =
              a.asm.wz).apply(null, arguments);
        }),
      UB = (a._emscripten_bind_b2ParticleSystem_ParticleApplyForce_2 =
        function () {
          return (UB =
            a._emscripten_bind_b2ParticleSystem_ParticleApplyForce_2 =
              a.asm.xz).apply(null, arguments);
        }),
      VB = (a._emscripten_bind_b2ParticleSystem_ApplyForce_3 = function () {
        return (VB = a._emscripten_bind_b2ParticleSystem_ApplyForce_3 =
          a.asm.yz).apply(null, arguments);
      }),
      WB = (a._emscripten_bind_b2ParticleSystem_GetNext_0 = function () {
        return (WB = a._emscripten_bind_b2ParticleSystem_GetNext_0 =
          a.asm.zz).apply(null, arguments);
      }),
      XB = (a._emscripten_bind_b2ParticleSystem_QueryAABB_2 = function () {
        return (XB = a._emscripten_bind_b2ParticleSystem_QueryAABB_2 =
          a.asm.Az).apply(null, arguments);
      }),
      YB = (a._emscripten_bind_b2ParticleSystem_QueryShapeAABB_3 = function () {
        return (YB = a._emscripten_bind_b2ParticleSystem_QueryShapeAABB_3 =
          a.asm.Bz).apply(null, arguments);
      }),
      ZB = (a._emscripten_bind_b2ParticleSystem_RayCast_3 = function () {
        return (ZB = a._emscripten_bind_b2ParticleSystem_RayCast_3 =
          a.asm.Cz).apply(null, arguments);
      }),
      $B = (a._emscripten_bind_b2ParticleSystem_ComputeAABB_1 = function () {
        return ($B = a._emscripten_bind_b2ParticleSystem_ComputeAABB_1 =
          a.asm.Dz).apply(null, arguments);
      }),
      aC = (a._emscripten_bind_b2ParticleHandle_b2ParticleHandle_0 =
        function () {
          return (aC = a._emscripten_bind_b2ParticleHandle_b2ParticleHandle_0 =
            a.asm.Ez).apply(null, arguments);
        }),
      bC = (a._emscripten_bind_b2ParticleHandle_GetIndex_0 = function () {
        return (bC = a._emscripten_bind_b2ParticleHandle_GetIndex_0 =
          a.asm.Fz).apply(null, arguments);
      }),
      cC = (a._emscripten_bind_b2ParticleHandle_InsertAfter_1 = function () {
        return (cC = a._emscripten_bind_b2ParticleHandle_InsertAfter_1 =
          a.asm.Gz).apply(null, arguments);
      }),
      dC = (a._emscripten_bind_b2ParticleHandle_InsertBefore_1 = function () {
        return (dC = a._emscripten_bind_b2ParticleHandle_InsertBefore_1 =
          a.asm.Hz).apply(null, arguments);
      }),
      eC = (a._emscripten_bind_b2ParticleHandle_GetNext_0 = function () {
        return (eC = a._emscripten_bind_b2ParticleHandle_GetNext_0 =
          a.asm.Iz).apply(null, arguments);
      }),
      fC = (a._emscripten_bind_b2ParticleHandle_GetPrevious_0 = function () {
        return (fC = a._emscripten_bind_b2ParticleHandle_GetPrevious_0 =
          a.asm.Jz).apply(null, arguments);
      }),
      gC = (a._emscripten_bind_b2ParticleHandle_GetTerminator_0 = function () {
        return (gC = a._emscripten_bind_b2ParticleHandle_GetTerminator_0 =
          a.asm.Kz).apply(null, arguments);
      }),
      hC = (a._emscripten_bind_b2ParticleHandle_Remove_0 = function () {
        return (hC = a._emscripten_bind_b2ParticleHandle_Remove_0 =
          a.asm.Lz).apply(null, arguments);
      }),
      iC = (a._emscripten_bind_b2ParticleHandle_InList_0 = function () {
        return (iC = a._emscripten_bind_b2ParticleHandle_InList_0 =
          a.asm.Mz).apply(null, arguments);
      }),
      jC = (a._emscripten_bind_b2ParticleHandle_IsEmpty_0 = function () {
        return (jC = a._emscripten_bind_b2ParticleHandle_IsEmpty_0 =
          a.asm.Nz).apply(null, arguments);
      }),
      kC = (a._emscripten_bind_b2ParticleHandle_GetLength_0 = function () {
        return (kC = a._emscripten_bind_b2ParticleHandle_GetLength_0 =
          a.asm.Oz).apply(null, arguments);
      }),
      lC = (a._emscripten_bind_b2ParticleHandle___destroy___0 = function () {
        return (lC = a._emscripten_bind_b2ParticleHandle___destroy___0 =
          a.asm.Pz).apply(null, arguments);
      }),
      mC = (a._emscripten_bind_b2StackAllocator_b2StackAllocator_0 =
        function () {
          return (mC = a._emscripten_bind_b2StackAllocator_b2StackAllocator_0 =
            a.asm.Qz).apply(null, arguments);
        }),
      nC = (a._emscripten_bind_b2StackAllocator_Allocate_1 = function () {
        return (nC = a._emscripten_bind_b2StackAllocator_Allocate_1 =
          a.asm.Rz).apply(null, arguments);
      }),
      oC = (a._emscripten_bind_b2StackAllocator_Reallocate_2 = function () {
        return (oC = a._emscripten_bind_b2StackAllocator_Reallocate_2 =
          a.asm.Sz).apply(null, arguments);
      }),
      pC = (a._emscripten_bind_b2StackAllocator_Free_1 = function () {
        return (pC = a._emscripten_bind_b2StackAllocator_Free_1 =
          a.asm.Tz).apply(null, arguments);
      }),
      qC = (a._emscripten_bind_b2StackAllocator___destroy___0 = function () {
        return (qC = a._emscripten_bind_b2StackAllocator___destroy___0 =
          a.asm.Uz).apply(null, arguments);
      }),
      rC = (a._emscripten_bind_b2VoronoiDiagram_b2VoronoiDiagram_2 =
        function () {
          return (rC = a._emscripten_bind_b2VoronoiDiagram_b2VoronoiDiagram_2 =
            a.asm.Vz).apply(null, arguments);
        }),
      sC = (a._emscripten_bind_b2VoronoiDiagram_AddGenerator_3 = function () {
        return (sC = a._emscripten_bind_b2VoronoiDiagram_AddGenerator_3 =
          a.asm.Wz).apply(null, arguments);
      }),
      tC = (a._emscripten_bind_b2VoronoiDiagram_Generate_2 = function () {
        return (tC = a._emscripten_bind_b2VoronoiDiagram_Generate_2 =
          a.asm.Xz).apply(null, arguments);
      }),
      uC = (a._emscripten_bind_b2VoronoiDiagram_GetNodes_1 = function () {
        return (uC = a._emscripten_bind_b2VoronoiDiagram_GetNodes_1 =
          a.asm.Yz).apply(null, arguments);
      }),
      vC = (a._emscripten_bind_b2VoronoiDiagram___destroy___0 = function () {
        return (vC = a._emscripten_bind_b2VoronoiDiagram___destroy___0 =
          a.asm.Zz).apply(null, arguments);
      }),
      wC = (a._emscripten_bind_NodeCallback___destroy___0 = function () {
        return (wC = a._emscripten_bind_NodeCallback___destroy___0 =
          a.asm._z).apply(null, arguments);
      }),
      xC = (a._emscripten_enum_b2ShapeType_e_circle = function () {
        return (xC = a._emscripten_enum_b2ShapeType_e_circle = a.asm.$z).apply(
          null,
          arguments,
        );
      }),
      yC = (a._emscripten_enum_b2ShapeType_e_edge = function () {
        return (yC = a._emscripten_enum_b2ShapeType_e_edge = a.asm.aA).apply(
          null,
          arguments,
        );
      }),
      zC = (a._emscripten_enum_b2ShapeType_e_polygon = function () {
        return (zC = a._emscripten_enum_b2ShapeType_e_polygon = a.asm.bA).apply(
          null,
          arguments,
        );
      }),
      AC = (a._emscripten_enum_b2ShapeType_e_chain = function () {
        return (AC = a._emscripten_enum_b2ShapeType_e_chain = a.asm.cA).apply(
          null,
          arguments,
        );
      }),
      BC = (a._emscripten_enum_b2ShapeType_e_typeCount = function () {
        return (BC = a._emscripten_enum_b2ShapeType_e_typeCount =
          a.asm.dA).apply(null, arguments);
      }),
      CC = (a._emscripten_enum_b2BodyType_b2_staticBody = function () {
        return (CC = a._emscripten_enum_b2BodyType_b2_staticBody =
          a.asm.eA).apply(null, arguments);
      }),
      DC = (a._emscripten_enum_b2BodyType_b2_kinematicBody = function () {
        return (DC = a._emscripten_enum_b2BodyType_b2_kinematicBody =
          a.asm.fA).apply(null, arguments);
      }),
      EC = (a._emscripten_enum_b2BodyType_b2_dynamicBody = function () {
        return (EC = a._emscripten_enum_b2BodyType_b2_dynamicBody =
          a.asm.gA).apply(null, arguments);
      }),
      FC = (a._emscripten_enum_b2JointType_e_unknownJoint = function () {
        return (FC = a._emscripten_enum_b2JointType_e_unknownJoint =
          a.asm.hA).apply(null, arguments);
      }),
      GC = (a._emscripten_enum_b2JointType_e_revoluteJoint = function () {
        return (GC = a._emscripten_enum_b2JointType_e_revoluteJoint =
          a.asm.iA).apply(null, arguments);
      }),
      HC = (a._emscripten_enum_b2JointType_e_prismaticJoint = function () {
        return (HC = a._emscripten_enum_b2JointType_e_prismaticJoint =
          a.asm.jA).apply(null, arguments);
      }),
      IC = (a._emscripten_enum_b2JointType_e_distanceJoint = function () {
        return (IC = a._emscripten_enum_b2JointType_e_distanceJoint =
          a.asm.kA).apply(null, arguments);
      }),
      JC = (a._emscripten_enum_b2JointType_e_pulleyJoint = function () {
        return (JC = a._emscripten_enum_b2JointType_e_pulleyJoint =
          a.asm.lA).apply(null, arguments);
      }),
      KC = (a._emscripten_enum_b2JointType_e_mouseJoint = function () {
        return (KC = a._emscripten_enum_b2JointType_e_mouseJoint =
          a.asm.mA).apply(null, arguments);
      }),
      LC = (a._emscripten_enum_b2JointType_e_gearJoint = function () {
        return (LC = a._emscripten_enum_b2JointType_e_gearJoint =
          a.asm.nA).apply(null, arguments);
      }),
      MC = (a._emscripten_enum_b2JointType_e_wheelJoint = function () {
        return (MC = a._emscripten_enum_b2JointType_e_wheelJoint =
          a.asm.oA).apply(null, arguments);
      }),
      NC = (a._emscripten_enum_b2JointType_e_weldJoint = function () {
        return (NC = a._emscripten_enum_b2JointType_e_weldJoint =
          a.asm.pA).apply(null, arguments);
      }),
      OC = (a._emscripten_enum_b2JointType_e_frictionJoint = function () {
        return (OC = a._emscripten_enum_b2JointType_e_frictionJoint =
          a.asm.qA).apply(null, arguments);
      }),
      PC = (a._emscripten_enum_b2JointType_e_ropeJoint = function () {
        return (PC = a._emscripten_enum_b2JointType_e_ropeJoint =
          a.asm.rA).apply(null, arguments);
      }),
      QC = (a._emscripten_enum_b2JointType_e_motorJoint = function () {
        return (QC = a._emscripten_enum_b2JointType_e_motorJoint =
          a.asm.sA).apply(null, arguments);
      }),
      RC = (a._emscripten_enum_b2ContactFeatureType_e_vertex = function () {
        return (RC = a._emscripten_enum_b2ContactFeatureType_e_vertex =
          a.asm.tA).apply(null, arguments);
      }),
      SC = (a._emscripten_enum_b2ContactFeatureType_e_face = function () {
        return (SC = a._emscripten_enum_b2ContactFeatureType_e_face =
          a.asm.uA).apply(null, arguments);
      }),
      TC = (a._emscripten_enum_b2DrawFlag_e_shapeBit = function () {
        return (TC = a._emscripten_enum_b2DrawFlag_e_shapeBit = a.asm.vA).apply(
          null,
          arguments,
        );
      }),
      UC = (a._emscripten_enum_b2DrawFlag_e_jointBit = function () {
        return (UC = a._emscripten_enum_b2DrawFlag_e_jointBit = a.asm.wA).apply(
          null,
          arguments,
        );
      }),
      VC = (a._emscripten_enum_b2DrawFlag_e_aabbBit = function () {
        return (VC = a._emscripten_enum_b2DrawFlag_e_aabbBit = a.asm.xA).apply(
          null,
          arguments,
        );
      }),
      WC = (a._emscripten_enum_b2DrawFlag_e_pairBit = function () {
        return (WC = a._emscripten_enum_b2DrawFlag_e_pairBit = a.asm.yA).apply(
          null,
          arguments,
        );
      }),
      XC = (a._emscripten_enum_b2DrawFlag_e_centerOfMassBit = function () {
        return (XC = a._emscripten_enum_b2DrawFlag_e_centerOfMassBit =
          a.asm.zA).apply(null, arguments);
      }),
      YC = (a._emscripten_enum_b2DrawFlag_e_particleBit = function () {
        return (YC = a._emscripten_enum_b2DrawFlag_e_particleBit =
          a.asm.AA).apply(null, arguments);
      }),
      ZC = (a._emscripten_enum_b2ManifoldType_e_circles = function () {
        return (ZC = a._emscripten_enum_b2ManifoldType_e_circles =
          a.asm.BA).apply(null, arguments);
      }),
      $C = (a._emscripten_enum_b2ManifoldType_e_faceA = function () {
        return ($C = a._emscripten_enum_b2ManifoldType_e_faceA =
          a.asm.CA).apply(null, arguments);
      }),
      aD = (a._emscripten_enum_b2ManifoldType_e_faceB = function () {
        return (aD = a._emscripten_enum_b2ManifoldType_e_faceB =
          a.asm.DA).apply(null, arguments);
      }),
      bD = (a._emscripten_enum_b2PointState_b2_nullState = function () {
        return (bD = a._emscripten_enum_b2PointState_b2_nullState =
          a.asm.EA).apply(null, arguments);
      }),
      cD = (a._emscripten_enum_b2PointState_b2_addState = function () {
        return (cD = a._emscripten_enum_b2PointState_b2_addState =
          a.asm.FA).apply(null, arguments);
      }),
      dD = (a._emscripten_enum_b2PointState_b2_persistState = function () {
        return (dD = a._emscripten_enum_b2PointState_b2_persistState =
          a.asm.GA).apply(null, arguments);
      }),
      eD = (a._emscripten_enum_b2PointState_b2_removeState = function () {
        return (eD = a._emscripten_enum_b2PointState_b2_removeState =
          a.asm.HA).apply(null, arguments);
      }),
      fD = (a._emscripten_enum_b2StretchingModel_b2_pbdStretchingModel =
        function () {
          return (fD =
            a._emscripten_enum_b2StretchingModel_b2_pbdStretchingModel =
              a.asm.IA).apply(null, arguments);
        }),
      gD = (a._emscripten_enum_b2StretchingModel_b2_xpbdStretchingModel =
        function () {
          return (gD =
            a._emscripten_enum_b2StretchingModel_b2_xpbdStretchingModel =
              a.asm.JA).apply(null, arguments);
        }),
      hD = (a._emscripten_enum_b2BendingModel_b2_springAngleBendingModel =
        function () {
          return (hD =
            a._emscripten_enum_b2BendingModel_b2_springAngleBendingModel =
              a.asm.KA).apply(null, arguments);
        }),
      iD = (a._emscripten_enum_b2BendingModel_b2_pbdAngleBendingModel =
        function () {
          return (iD =
            a._emscripten_enum_b2BendingModel_b2_pbdAngleBendingModel =
              a.asm.LA).apply(null, arguments);
        }),
      jD = (a._emscripten_enum_b2BendingModel_b2_xpbdAngleBendingModel =
        function () {
          return (jD =
            a._emscripten_enum_b2BendingModel_b2_xpbdAngleBendingModel =
              a.asm.MA).apply(null, arguments);
        }),
      kD = (a._emscripten_enum_b2BendingModel_b2_pbdDistanceBendingModel =
        function () {
          return (kD =
            a._emscripten_enum_b2BendingModel_b2_pbdDistanceBendingModel =
              a.asm.NA).apply(null, arguments);
        }),
      lD = (a._emscripten_enum_b2BendingModel_b2_pbdHeightBendingModel =
        function () {
          return (lD =
            a._emscripten_enum_b2BendingModel_b2_pbdHeightBendingModel =
              a.asm.OA).apply(null, arguments);
        }),
      mD = (a._emscripten_enum_b2ParticleFlag_b2_waterParticle = function () {
        return (mD = a._emscripten_enum_b2ParticleFlag_b2_waterParticle =
          a.asm.PA).apply(null, arguments);
      }),
      nD = (a._emscripten_enum_b2ParticleFlag_b2_zombieParticle = function () {
        return (nD = a._emscripten_enum_b2ParticleFlag_b2_zombieParticle =
          a.asm.QA).apply(null, arguments);
      }),
      oD = (a._emscripten_enum_b2ParticleFlag_b2_wallParticle = function () {
        return (oD = a._emscripten_enum_b2ParticleFlag_b2_wallParticle =
          a.asm.RA).apply(null, arguments);
      }),
      pD = (a._emscripten_enum_b2ParticleFlag_b2_springParticle = function () {
        return (pD = a._emscripten_enum_b2ParticleFlag_b2_springParticle =
          a.asm.SA).apply(null, arguments);
      }),
      qD = (a._emscripten_enum_b2ParticleFlag_b2_elasticParticle = function () {
        return (qD = a._emscripten_enum_b2ParticleFlag_b2_elasticParticle =
          a.asm.TA).apply(null, arguments);
      }),
      rD = (a._emscripten_enum_b2ParticleFlag_b2_viscousParticle = function () {
        return (rD = a._emscripten_enum_b2ParticleFlag_b2_viscousParticle =
          a.asm.UA).apply(null, arguments);
      }),
      sD = (a._emscripten_enum_b2ParticleFlag_b2_powderParticle = function () {
        return (sD = a._emscripten_enum_b2ParticleFlag_b2_powderParticle =
          a.asm.VA).apply(null, arguments);
      }),
      tD = (a._emscripten_enum_b2ParticleFlag_b2_tensileParticle = function () {
        return (tD = a._emscripten_enum_b2ParticleFlag_b2_tensileParticle =
          a.asm.WA).apply(null, arguments);
      }),
      uD = (a._emscripten_enum_b2ParticleFlag_b2_colorMixingParticle =
        function () {
          return (uD =
            a._emscripten_enum_b2ParticleFlag_b2_colorMixingParticle =
              a.asm.XA).apply(null, arguments);
        }),
      vD = (a._emscripten_enum_b2ParticleFlag_b2_destructionListenerParticle =
        function () {
          return (vD =
            a._emscripten_enum_b2ParticleFlag_b2_destructionListenerParticle =
              a.asm.YA).apply(null, arguments);
        }),
      wD = (a._emscripten_enum_b2ParticleFlag_b2_barrierParticle = function () {
        return (wD = a._emscripten_enum_b2ParticleFlag_b2_barrierParticle =
          a.asm.ZA).apply(null, arguments);
      }),
      xD = (a._emscripten_enum_b2ParticleFlag_b2_staticPressureParticle =
        function () {
          return (xD =
            a._emscripten_enum_b2ParticleFlag_b2_staticPressureParticle =
              a.asm._A).apply(null, arguments);
        }),
      yD = (a._emscripten_enum_b2ParticleFlag_b2_reactiveParticle =
        function () {
          return (yD = a._emscripten_enum_b2ParticleFlag_b2_reactiveParticle =
            a.asm.$A).apply(null, arguments);
        }),
      zD = (a._emscripten_enum_b2ParticleFlag_b2_repulsiveParticle =
        function () {
          return (zD = a._emscripten_enum_b2ParticleFlag_b2_repulsiveParticle =
            a.asm.aB).apply(null, arguments);
        }),
      AD =
        (a._emscripten_enum_b2ParticleFlag_b2_fixtureContactListenerParticle =
          function () {
            return (AD =
              a._emscripten_enum_b2ParticleFlag_b2_fixtureContactListenerParticle =
                a.asm.bB).apply(null, arguments);
          }),
      BD =
        (a._emscripten_enum_b2ParticleFlag_b2_particleContactListenerParticle =
          function () {
            return (BD =
              a._emscripten_enum_b2ParticleFlag_b2_particleContactListenerParticle =
                a.asm.cB).apply(null, arguments);
          }),
      CD = (a._emscripten_enum_b2ParticleFlag_b2_fixtureContactFilterParticle =
        function () {
          return (CD =
            a._emscripten_enum_b2ParticleFlag_b2_fixtureContactFilterParticle =
              a.asm.dB).apply(null, arguments);
        }),
      DD = (a._emscripten_enum_b2ParticleFlag_b2_particleContactFilterParticle =
        function () {
          return (DD =
            a._emscripten_enum_b2ParticleFlag_b2_particleContactFilterParticle =
              a.asm.eB).apply(null, arguments);
        }),
      ED = (a._emscripten_enum_b2ParticleGroupFlag_b2_solidParticleGroup =
        function () {
          return (ED =
            a._emscripten_enum_b2ParticleGroupFlag_b2_solidParticleGroup =
              a.asm.fB).apply(null, arguments);
        }),
      FD = (a._emscripten_enum_b2ParticleGroupFlag_b2_rigidParticleGroup =
        function () {
          return (FD =
            a._emscripten_enum_b2ParticleGroupFlag_b2_rigidParticleGroup =
              a.asm.gB).apply(null, arguments);
        }),
      GD = (a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupCanBeEmpty =
        function () {
          return (GD =
            a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupCanBeEmpty =
              a.asm.hB).apply(null, arguments);
        }),
      HD =
        (a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupWillBeDestroyed =
          function () {
            return (HD =
              a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupWillBeDestroyed =
                a.asm.iB).apply(null, arguments);
          }),
      ID =
        (a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupNeedsUpdateDepth =
          function () {
            return (ID =
              a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupNeedsUpdateDepth =
                a.asm.jB).apply(null, arguments);
          }),
      JD =
        (a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupInternalMask =
          function () {
            return (JD =
              a._emscripten_enum_b2ParticleGroupFlag_b2_particleGroupInternalMask =
                a.asm.kB).apply(null, arguments);
          }),
      KD = (a._emscripten_bind_b2RopeDef_get_masses_0 = function () {
        return (KD = a._emscripten_bind_b2RopeDef_get_masses_0 =
          a.asm.lB).apply(null, arguments);
      }),
      LD = (a._emscripten_bind_b2RopeDef_set_masses_1 = function () {
        return (LD = a._emscripten_bind_b2RopeDef_set_masses_1 =
          a.asm.mB).apply(null, arguments);
      }),
      MD = (a._emscripten_bind_JSNodeCallback_JSNodeCallback_0 = function () {
        return (MD = a._emscripten_bind_JSNodeCallback_JSNodeCallback_0 =
          a.asm.nB).apply(null, arguments);
      }),
      ND = (a._emscripten_bind_JSNodeCallback_op_call_3 = function () {
        return (ND = a._emscripten_bind_JSNodeCallback_op_call_3 =
          a.asm.oB).apply(null, arguments);
      }),
      OD = (a._emscripten_bind_JSNodeCallback___destroy___0 = function () {
        return (OD = a._emscripten_bind_JSNodeCallback___destroy___0 =
          a.asm.pB).apply(null, arguments);
      }),
      PD = (a._emscripten_bind_b2GetPointStates_4 = function () {
        return (PD = a._emscripten_bind_b2GetPointStates_4 = a.asm.qB).apply(
          null,
          arguments,
        );
      }),
      QD = (a._emscripten_bind_b2CollideCircles_5 = function () {
        return (QD = a._emscripten_bind_b2CollideCircles_5 = a.asm.rB).apply(
          null,
          arguments,
        );
      }),
      RD = (a._emscripten_bind_b2CollidePolygonAndCircle_5 = function () {
        return (RD = a._emscripten_bind_b2CollidePolygonAndCircle_5 =
          a.asm.sB).apply(null, arguments);
      }),
      SD = (a._emscripten_bind_b2CollidePolygons_5 = function () {
        return (SD = a._emscripten_bind_b2CollidePolygons_5 = a.asm.tB).apply(
          null,
          arguments,
        );
      }),
      TD = (a._emscripten_bind_b2CollideEdgeAndCircle_5 = function () {
        return (TD = a._emscripten_bind_b2CollideEdgeAndCircle_5 =
          a.asm.uB).apply(null, arguments);
      }),
      UD = (a._emscripten_bind_b2CollideEdgeAndPolygon_5 = function () {
        return (UD = a._emscripten_bind_b2CollideEdgeAndPolygon_5 =
          a.asm.vB).apply(null, arguments);
      }),
      VD = (a._emscripten_bind_b2ClipSegmentToLine_5 = function () {
        return (VD = a._emscripten_bind_b2ClipSegmentToLine_5 = a.asm.wB).apply(
          null,
          arguments,
        );
      }),
      WD = (a._emscripten_bind_b2TestOverlap_6 = function () {
        return (WD = a._emscripten_bind_b2TestOverlap_6 = a.asm.xB).apply(
          null,
          arguments,
        );
      }),
      XD = (a._emscripten_bind_b2TestOverlap_2 = function () {
        return (XD = a._emscripten_bind_b2TestOverlap_2 = a.asm.yB).apply(
          null,
          arguments,
        );
      }),
      YD = (a._emscripten_bind_b2LinearStiffness_6 = function () {
        return (YD = a._emscripten_bind_b2LinearStiffness_6 = a.asm.zB).apply(
          null,
          arguments,
        );
      }),
      ZD = (a._emscripten_bind_b2AngularStiffness_6 = function () {
        return (ZD = a._emscripten_bind_b2AngularStiffness_6 = a.asm.AB).apply(
          null,
          arguments,
        );
      });
    a._malloc = function () {
      return (a._malloc = a.asm.CB).apply(null, arguments);
    };
    a._free = function () {
      return (a._free = a.asm.DB).apply(null, arguments);
    };
    var $D;
    Ia = function aE() {
      $D || bE();
      $D || (Ia = aE);
    };
    function bE() {
      function b() {
        if (!$D && (($D = !0), (a.calledRun = !0), !ta)) {
          Fa = !0;
          Pa(Da);
          aa(a);
          if (a.onRuntimeInitialized) a.onRuntimeInitialized();
          if (a.postRun)
            for (
              "function" == typeof a.postRun && (a.postRun = [a.postRun]);
              a.postRun.length;

            ) {
              var c = a.postRun.shift();
              Ea.unshift(c);
            }
          Pa(Ea);
        }
      }
      if (!(0 < Ga)) {
        if (a.preRun)
          for (
            "function" == typeof a.preRun && (a.preRun = [a.preRun]);
            a.preRun.length;

          )
            Ca.unshift(a.preRun.shift());
        Pa(Ca);
        0 < Ga ||
          (a.setStatus
            ? (a.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  a.setStatus("");
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    a.run = bE;
    if (a.preInit)
      for (
        "function" == typeof a.preInit && (a.preInit = [a.preInit]);
        0 < a.preInit.length;

      )
        a.preInit.pop()();
    bE();
    function f() {}
    f.prototype = Object.create(f.prototype);
    f.prototype.constructor = f;
    f.prototype.FB = f;
    f.GB = {};
    a.WrapperObject = f;
    function g(b) {
      return (b || f).GB;
    }
    a.getCache = g;
    function h(b, c) {
      var d = g(c),
        e = d[b];
      if (e) return e;
      e = Object.create((c || f).prototype);
      e.EB = b;
      return (d[b] = e);
    }
    a.wrapPointer = h;
    a.castObject = function (b, c) {
      return h(b.EB, c);
    };
    a.NULL = h(0);
    a.destroy = function (b) {
      if (!b.__destroy__)
        throw "Error: Cannot destroy object. (Did you create it yourself?)";
      b.__destroy__();
      delete g(b.FB)[b.EB];
    };
    a.compare = function (b, c) {
      return b.EB === c.EB;
    };
    a.getPointer = function (b) {
      return b.EB;
    };
    a.getClass = function (b) {
      return b.FB;
    };
    var cE = 0,
      dE = 0,
      eE = [],
      fE = 0;
    function gE() {
      if (fE) {
        for (var b = 0; b < eE.length; b++) a._free(eE[b]);
        eE.length = 0;
        a._free(cE);
        cE = 0;
        dE += fE;
        fE = 0;
      }
      cE ||
        ((dE += 128),
        (cE = a._malloc(dE)) || oa("Assertion failed: undefined"));
    }
    function hE() {
      throw "cannot construct a b2ContactListenerWrapper, no constructor in IDL";
    }
    hE.prototype = Object.create(f.prototype);
    hE.prototype.constructor = hE;
    hE.prototype.FB = hE;
    hE.GB = {};
    a.b2ContactListenerWrapper = hE;
    hE.prototype.__destroy__ = hE.prototype.HB = function () {
      Wa(this.EB);
    };
    function iE() {
      throw "cannot construct a b2Shape, no constructor in IDL";
    }
    iE.prototype = Object.create(f.prototype);
    iE.prototype.constructor = iE;
    iE.prototype.FB = iE;
    iE.GB = {};
    a.b2Shape = iE;
    iE.prototype.GetType = function () {
      return Xa(this.EB);
    };
    iE.prototype.GetChildCount = function () {
      return Ya(this.EB);
    };
    iE.prototype.TestPoint = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!Za(d, b, c);
    };
    iE.prototype.RayCast = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      return !!$a(q, b, c, d, e);
    };
    iE.prototype.ComputeAABB = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      bb(e, b, c, d);
    };
    iE.prototype.ComputeMass = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      cb(d, b, c);
    };
    iE.prototype.get_m_type = iE.prototype.YB = function () {
      return db(this.EB);
    };
    iE.prototype.set_m_type = iE.prototype.aC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      eb(c, b);
    };
    Object.defineProperty(iE.prototype, "m_type", {
      get: iE.prototype.YB,
      set: iE.prototype.aC,
    });
    iE.prototype.get_m_radius = iE.prototype.XB = function () {
      return fb(this.EB);
    };
    iE.prototype.set_m_radius = iE.prototype.$B = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hb(c, b);
    };
    Object.defineProperty(iE.prototype, "m_radius", {
      get: iE.prototype.XB,
      set: iE.prototype.$B,
    });
    iE.prototype.__destroy__ = iE.prototype.HB = function () {
      ib(this.EB);
    };
    function jE() {
      throw "cannot construct a b2RayCastCallback, no constructor in IDL";
    }
    jE.prototype = Object.create(f.prototype);
    jE.prototype.constructor = jE;
    jE.prototype.FB = jE;
    jE.GB = {};
    a.b2RayCastCallback = jE;
    jE.prototype.__destroy__ = jE.prototype.HB = function () {
      jb(this.EB);
    };
    function kE() {
      throw "cannot construct a b2QueryCallback, no constructor in IDL";
    }
    kE.prototype = Object.create(f.prototype);
    kE.prototype.constructor = kE;
    kE.prototype.FB = kE;
    kE.GB = {};
    a.b2QueryCallback = kE;
    kE.prototype.__destroy__ = kE.prototype.HB = function () {
      kb(this.EB);
    };
    function k() {
      this.EB = lb();
      g(k)[this.EB] = this;
    }
    k.prototype = Object.create(f.prototype);
    k.prototype.constructor = k;
    k.prototype.FB = k;
    k.GB = {};
    a.b2JointDef = k;
    k.prototype.get_type = k.prototype.KB = function () {
      return mb(this.EB);
    };
    k.prototype.set_type = k.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pb(c, b);
    };
    Object.defineProperty(k.prototype, "type", {
      get: k.prototype.KB,
      set: k.prototype.LB,
    });
    k.prototype.get_userData = k.prototype.IB = function () {
      return h(qb(this.EB), lE);
    };
    k.prototype.set_userData = k.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rb(c, b);
    };
    Object.defineProperty(k.prototype, "userData", {
      get: k.prototype.IB,
      set: k.prototype.JB,
    });
    k.prototype.get_bodyA = k.prototype.MB = function () {
      return h(sb(this.EB), l);
    };
    k.prototype.set_bodyA = k.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      tb(c, b);
    };
    Object.defineProperty(k.prototype, "bodyA", {
      get: k.prototype.MB,
      set: k.prototype.PB,
    });
    k.prototype.get_bodyB = k.prototype.NB = function () {
      return h(ub(this.EB), l);
    };
    k.prototype.set_bodyB = k.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wb(c, b);
    };
    Object.defineProperty(k.prototype, "bodyB", {
      get: k.prototype.NB,
      set: k.prototype.QB,
    });
    k.prototype.get_collideConnected = k.prototype.OB = function () {
      return !!xb(this.EB);
    };
    k.prototype.set_collideConnected = k.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yb(c, b);
    };
    Object.defineProperty(k.prototype, "collideConnected", {
      get: k.prototype.OB,
      set: k.prototype.RB,
    });
    k.prototype.__destroy__ = k.prototype.HB = function () {
      zb(this.EB);
    };
    function m() {
      throw "cannot construct a b2Joint, no constructor in IDL";
    }
    m.prototype = Object.create(f.prototype);
    m.prototype.constructor = m;
    m.prototype.FB = m;
    m.GB = {};
    a.b2Joint = m;
    m.prototype.GetType = function () {
      return Bb(this.EB);
    };
    m.prototype.GetBodyA = function () {
      return h(Cb(this.EB), l);
    };
    m.prototype.GetBodyB = function () {
      return h(Db(this.EB), l);
    };
    m.prototype.GetAnchorA = function () {
      return h(Fb(this.EB), n);
    };
    m.prototype.GetAnchorB = function () {
      return h(Gb(this.EB), n);
    };
    m.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Hb(c, b), n);
    };
    m.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Ib(c, b);
    };
    m.prototype.GetNext = function () {
      return h(Jb(this.EB), m);
    };
    m.prototype.GetUserData = function () {
      return h(Kb(this.EB), lE);
    };
    m.prototype.GetCollideConnected = function () {
      return !!Lb(this.EB);
    };
    m.prototype.Dump = function () {
      Mb(this.EB);
    };
    function mE() {
      throw "cannot construct a b2ContactFilterWrapper, no constructor in IDL";
    }
    mE.prototype = Object.create(f.prototype);
    mE.prototype.constructor = mE;
    mE.prototype.FB = mE;
    mE.GB = {};
    a.b2ContactFilterWrapper = mE;
    mE.prototype.__destroy__ = mE.prototype.HB = function () {
      Nb(this.EB);
    };
    function nE() {
      throw "cannot construct a b2DestructionListenerWrapper, no constructor in IDL";
    }
    nE.prototype = Object.create(f.prototype);
    nE.prototype.constructor = nE;
    nE.prototype.FB = nE;
    nE.GB = {};
    a.b2DestructionListenerWrapper = nE;
    nE.prototype.__destroy__ = nE.prototype.HB = function () {
      Ob(this.EB);
    };
    function oE() {
      throw "cannot construct a b2Draw, no constructor in IDL";
    }
    oE.prototype = Object.create(f.prototype);
    oE.prototype.constructor = oE;
    oE.prototype.FB = oE;
    oE.GB = {};
    a.b2Draw = oE;
    oE.prototype.SetFlags = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Sb(c, b);
    };
    oE.prototype.GetFlags = function () {
      return Tb(this.EB);
    };
    oE.prototype.AppendFlags = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ub(c, b);
    };
    oE.prototype.ClearFlags = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vb(c, b);
    };
    oE.prototype.__destroy__ = oE.prototype.HB = function () {
      Wb(this.EB);
    };
    function pE() {
      throw "cannot construct a VoidPtr, no constructor in IDL";
    }
    pE.prototype = Object.create(f.prototype);
    pE.prototype.constructor = pE;
    pE.prototype.FB = pE;
    pE.GB = {};
    a.VoidPtr = pE;
    pE.prototype.__destroy__ = pE.prototype.HB = function () {
      Xb(this.EB);
    };
    function qE() {
      throw "cannot construct a b2Contact, no constructor in IDL";
    }
    qE.prototype = Object.create(f.prototype);
    qE.prototype.constructor = qE;
    qE.prototype.FB = qE;
    qE.GB = {};
    a.b2Contact = qE;
    qE.prototype.GetManifold = function () {
      return h(Yb(this.EB), p);
    };
    qE.prototype.GetWorldManifold = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Zb(c, b);
    };
    qE.prototype.IsTouching = function () {
      return !!$b(this.EB);
    };
    qE.prototype.SetEnabled = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ac(c, b);
    };
    qE.prototype.IsEnabled = function () {
      return !!bc(this.EB);
    };
    qE.prototype.GetNext = function () {
      return h(cc(this.EB), qE);
    };
    qE.prototype.GetFixtureA = function () {
      return h(dc(this.EB), r);
    };
    qE.prototype.GetChildIndexA = function () {
      return ec(this.EB);
    };
    qE.prototype.GetFixtureB = function () {
      return h(fc(this.EB), r);
    };
    qE.prototype.GetChildIndexB = function () {
      return gc(this.EB);
    };
    qE.prototype.SetFriction = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hc(c, b);
    };
    qE.prototype.GetFriction = function () {
      return ic(this.EB);
    };
    qE.prototype.ResetFriction = function () {
      jc(this.EB);
    };
    qE.prototype.SetRestitution = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lc(c, b);
    };
    qE.prototype.GetRestitution = function () {
      return mc(this.EB);
    };
    qE.prototype.ResetRestitution = function () {
      nc(this.EB);
    };
    qE.prototype.SetRestitutionThreshold = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      oc(c, b);
    };
    qE.prototype.GetRestitutionThreshold = function () {
      return pc(this.EB);
    };
    qE.prototype.ResetRestitutionThreshold = function () {
      qc(this.EB);
    };
    qE.prototype.SetTangentSpeed = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rc(c, b);
    };
    qE.prototype.GetTangentSpeed = function () {
      return sc(this.EB);
    };
    function rE() {
      throw "cannot construct a b2ContactListener, no constructor in IDL";
    }
    rE.prototype = Object.create(f.prototype);
    rE.prototype.constructor = rE;
    rE.prototype.FB = rE;
    rE.GB = {};
    a.b2ContactListener = rE;
    rE.prototype.__destroy__ = rE.prototype.HB = function () {
      tc(this.EB);
    };
    function sE() {
      this.EB = uc();
      g(sE)[this.EB] = this;
    }
    sE.prototype = Object.create(hE.prototype);
    sE.prototype.constructor = sE;
    sE.prototype.FB = sE;
    sE.GB = {};
    a.JSContactListener = sE;
    sE.prototype.BeginContact = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vc(c, b);
    };
    sE.prototype.EndContact = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wc(c, b);
    };
    sE.prototype.BeginContactParticleSystemParticleBodyContact = function (
      b,
      c,
    ) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      xc(d, b, c);
    };
    sE.prototype.EndContactFixtureParticleSystemIndex = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      yc(e, b, c, d);
    };
    sE.prototype.BeginContactParticleSystemParticleContact = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      zc(d, b, c);
    };
    sE.prototype.EndContactParticleSystemIndexIndex = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Ac(e, b, c, d);
    };
    sE.prototype.PreSolve = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Bc(d, b, c);
    };
    sE.prototype.PostSolve = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Cc(d, b, c);
    };
    sE.prototype.__destroy__ = sE.prototype.HB = function () {
      Dc(this.EB);
    };
    function tE() {
      throw "cannot construct a JSContactListenerWithoutSolveCallbacks, no constructor in IDL";
    }
    tE.prototype = Object.create(hE.prototype);
    tE.prototype.constructor = tE;
    tE.prototype.FB = tE;
    tE.GB = {};
    a.JSContactListenerWithoutSolveCallbacks = tE;
    tE.prototype.JSContactListener = function () {
      Ec(this.EB);
    };
    tE.prototype.BeginContact = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fc(c, b);
    };
    tE.prototype.EndContact = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Gc(c, b);
    };
    tE.prototype.BeginContactParticleSystemParticleBodyContact = function (
      b,
      c,
    ) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Hc(d, b, c);
    };
    tE.prototype.EndContactFixtureParticleSystemIndex = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Ic(e, b, c, d);
    };
    tE.prototype.BeginContactParticleSystemParticleContact = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Jc(d, b, c);
    };
    tE.prototype.EndContactParticleSystemIndexIndex = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Kc(e, b, c, d);
    };
    tE.prototype.__destroy__ = tE.prototype.HB = function () {
      Lc(this.EB);
    };
    function t(b) {
      b && "object" === typeof b && (b = b.EB);
      this.EB = Mc(b);
      g(t)[this.EB] = this;
    }
    t.prototype = Object.create(f.prototype);
    t.prototype.constructor = t;
    t.prototype.FB = t;
    t.GB = {};
    a.b2World = t;
    t.prototype.SetDestructionListener = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nc(c, b);
    };
    t.prototype.SetContactFilter = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Oc(c, b);
    };
    t.prototype.SetContactListener = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pc(c, b);
    };
    t.prototype.SetDebugDraw = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qc(c, b);
    };
    t.prototype.CreateBody = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Rc(c, b), l);
    };
    t.prototype.DestroyBody = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Sc(c, b);
    };
    t.prototype.CreateJoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Tc(c, b), m);
    };
    t.prototype.DestroyJoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Uc(c, b);
    };
    t.prototype.CreateParticleSystem = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Vc(c, b), u);
    };
    t.prototype.DestroyParticleSystem = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Wc(c, b);
    };
    t.prototype.CalculateReasonableParticleIterations = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Xc(c, b);
    };
    t.prototype.Step = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      void 0 === e ? Yc(q, b, c, d) : Zc(q, b, c, d, e);
    };
    t.prototype.ClearForces = function () {
      $c(this.EB);
    };
    t.prototype.DebugDraw = function () {
      ad(this.EB);
    };
    t.prototype.QueryAABB = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      bd(d, b, c);
    };
    t.prototype.RayCast = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      cd(e, b, c, d);
    };
    t.prototype.GetBodyList = function () {
      return h(dd(this.EB), l);
    };
    t.prototype.GetJointList = function () {
      return h(ed(this.EB), m);
    };
    t.prototype.GetContactList = function () {
      return h(fd(this.EB), qE);
    };
    t.prototype.SetAllowSleeping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gd(c, b);
    };
    t.prototype.GetAllowSleeping = function () {
      return !!hd(this.EB);
    };
    t.prototype.SetWarmStarting = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jd(c, b);
    };
    t.prototype.GetWarmStarting = function () {
      return !!kd(this.EB);
    };
    t.prototype.SetContinuousPhysics = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ld(c, b);
    };
    t.prototype.GetContinuousPhysics = function () {
      return !!md(this.EB);
    };
    t.prototype.SetSubStepping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      nd(c, b);
    };
    t.prototype.GetSubStepping = function () {
      return !!od(this.EB);
    };
    t.prototype.GetProxyCount = function () {
      return pd(this.EB);
    };
    t.prototype.GetBodyCount = function () {
      return qd(this.EB);
    };
    t.prototype.GetJointCount = function () {
      return rd(this.EB);
    };
    t.prototype.GetContactCount = function () {
      return sd(this.EB);
    };
    t.prototype.GetTreeHeight = function () {
      return td(this.EB);
    };
    t.prototype.GetTreeBalance = function () {
      return ud(this.EB);
    };
    t.prototype.GetTreeQuality = function () {
      return vd(this.EB);
    };
    t.prototype.SetGravity = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wd(c, b);
    };
    t.prototype.GetGravity = function () {
      return h(xd(this.EB), n);
    };
    t.prototype.IsLocked = function () {
      return !!yd(this.EB);
    };
    t.prototype.SetAutoClearForces = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zd(c, b);
    };
    t.prototype.GetAutoClearForces = function () {
      return !!Ad(this.EB);
    };
    t.prototype.GetProfile = function () {
      return h(Bd(this.EB), v);
    };
    t.prototype.Dump = function () {
      Cd(this.EB);
    };
    t.prototype.__destroy__ = t.prototype.HB = function () {
      Dd(this.EB);
    };
    function uE() {
      throw "cannot construct a b2FixtureUserData, no constructor in IDL";
    }
    uE.prototype = Object.create(f.prototype);
    uE.prototype.constructor = uE;
    uE.prototype.FB = uE;
    uE.GB = {};
    a.b2FixtureUserData = uE;
    uE.prototype.get_pointer = uE.prototype.oC = function () {
      return Ed(this.EB);
    };
    uE.prototype.set_pointer = uE.prototype.AC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fd(c, b);
    };
    Object.defineProperty(uE.prototype, "pointer", {
      get: uE.prototype.oC,
      set: uE.prototype.AC,
    });
    uE.prototype.__destroy__ = uE.prototype.HB = function () {
      Gd(this.EB);
    };
    function w() {
      this.EB = Hd();
      g(w)[this.EB] = this;
    }
    w.prototype = Object.create(f.prototype);
    w.prototype.constructor = w;
    w.prototype.FB = w;
    w.GB = {};
    a.b2FixtureDef = w;
    w.prototype.get_shape = w.prototype.iD = function () {
      return h(Id(this.EB), iE);
    };
    w.prototype.set_shape = w.prototype.OD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jd(c, b);
    };
    Object.defineProperty(w.prototype, "shape", {
      get: w.prototype.iD,
      set: w.prototype.OD,
    });
    w.prototype.get_userData = w.prototype.IB = function () {
      return h(Kd(this.EB), uE);
    };
    w.prototype.set_userData = w.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ld(c, b);
    };
    Object.defineProperty(w.prototype, "userData", {
      get: w.prototype.IB,
      set: w.prototype.JB,
    });
    w.prototype.get_friction = w.prototype.wE = function () {
      return Md(this.EB);
    };
    w.prototype.set_friction = w.prototype.TG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nd(c, b);
    };
    Object.defineProperty(w.prototype, "friction", {
      get: w.prototype.wE,
      set: w.prototype.TG,
    });
    w.prototype.get_restitution = w.prototype.CF = function () {
      return Od(this.EB);
    };
    w.prototype.set_restitution = w.prototype.ZH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pd(c, b);
    };
    Object.defineProperty(w.prototype, "restitution", {
      get: w.prototype.CF,
      set: w.prototype.ZH,
    });
    w.prototype.get_restitutionThreshold = w.prototype.DF = function () {
      return Qd(this.EB);
    };
    w.prototype.set_restitutionThreshold = w.prototype.$H = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Rd(c, b);
    };
    Object.defineProperty(w.prototype, "restitutionThreshold", {
      get: w.prototype.DF,
      set: w.prototype.$H,
    });
    w.prototype.get_density = w.prototype.LC = function () {
      return Sd(this.EB);
    };
    w.prototype.set_density = w.prototype.qD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Td(c, b);
    };
    Object.defineProperty(w.prototype, "density", {
      get: w.prototype.LC,
      set: w.prototype.qD,
    });
    w.prototype.get_isSensor = w.prototype.EE = function () {
      return !!Ud(this.EB);
    };
    w.prototype.set_isSensor = w.prototype.aH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vd(c, b);
    };
    Object.defineProperty(w.prototype, "isSensor", {
      get: w.prototype.EE,
      set: w.prototype.aH,
    });
    w.prototype.get_filter = w.prototype.rE = function () {
      return h(Wd(this.EB), vE);
    };
    w.prototype.set_filter = w.prototype.NG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Xd(c, b);
    };
    Object.defineProperty(w.prototype, "filter", {
      get: w.prototype.rE,
      set: w.prototype.NG,
    });
    w.prototype.__destroy__ = w.prototype.HB = function () {
      Yd(this.EB);
    };
    function r() {
      throw "cannot construct a b2Fixture, no constructor in IDL";
    }
    r.prototype = Object.create(f.prototype);
    r.prototype.constructor = r;
    r.prototype.FB = r;
    r.GB = {};
    a.b2Fixture = r;
    r.prototype.GetType = function () {
      return Zd(this.EB);
    };
    r.prototype.GetShape = function () {
      return h($d(this.EB), iE);
    };
    r.prototype.SetSensor = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ae(c, b);
    };
    r.prototype.IsSensor = function () {
      return !!be(this.EB);
    };
    r.prototype.SetFilterData = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ce(c, b);
    };
    r.prototype.GetFilterData = function () {
      return h(de(this.EB), vE);
    };
    r.prototype.Refilter = function () {
      ee(this.EB);
    };
    r.prototype.GetBody = function () {
      return h(fe(this.EB), l);
    };
    r.prototype.GetNext = function () {
      return h(ge(this.EB), r);
    };
    r.prototype.GetUserData = function () {
      return h(he(this.EB), uE);
    };
    r.prototype.TestPoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!ie(c, b);
    };
    r.prototype.RayCast = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      return !!je(e, b, c, d);
    };
    r.prototype.GetMassData = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ke(c, b);
    };
    r.prototype.SetDensity = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      le(c, b);
    };
    r.prototype.GetDensity = function () {
      return me(this.EB);
    };
    r.prototype.GetFriction = function () {
      return ne(this.EB);
    };
    r.prototype.SetFriction = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      oe(c, b);
    };
    r.prototype.GetRestitution = function () {
      return pe(this.EB);
    };
    r.prototype.SetRestitution = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qe(c, b);
    };
    r.prototype.GetRestitutionThreshold = function () {
      return re(this.EB);
    };
    r.prototype.SetRestitutionThreshold = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      se(c, b);
    };
    r.prototype.GetAABB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(te(c, b), wE);
    };
    r.prototype.Dump = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ue(c, b);
    };
    r.prototype.__destroy__ = r.prototype.HB = function () {
      ve(this.EB);
    };
    function xE(b, c) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      this.EB =
        void 0 === b
          ? we()
          : void 0 === c
            ? _emscripten_bind_b2Transform_b2Transform_1(b)
            : xe(b, c);
      g(xE)[this.EB] = this;
    }
    xE.prototype = Object.create(f.prototype);
    xE.prototype.constructor = xE;
    xE.prototype.FB = xE;
    xE.GB = {};
    a.b2Transform = xE;
    xE.prototype.SetIdentity = function () {
      ye(this.EB);
    };
    xE.prototype.Set = xE.prototype.Set = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      ze(d, b, c);
    };
    xE.prototype.get_p = xE.prototype.oF = function () {
      return h(Ae(this.EB), n);
    };
    xE.prototype.set_p = xE.prototype.LH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Be(c, b);
    };
    Object.defineProperty(xE.prototype, "p", {
      get: xE.prototype.oF,
      set: xE.prototype.LH,
    });
    xE.prototype.get_q = xE.prototype.zF = function () {
      return h(Ce(this.EB), yE);
    };
    xE.prototype.set_q = xE.prototype.WH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      De(c, b);
    };
    Object.defineProperty(xE.prototype, "q", {
      get: xE.prototype.zF,
      set: xE.prototype.WH,
    });
    xE.prototype.__destroy__ = xE.prototype.HB = function () {
      Ee(this.EB);
    };
    function zE() {
      this.EB = Fe();
      g(zE)[this.EB] = this;
    }
    zE.prototype = Object.create(jE.prototype);
    zE.prototype.constructor = zE;
    zE.prototype.FB = zE;
    zE.GB = {};
    a.JSRayCastCallback = zE;
    zE.prototype.ReportFixture = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      return Ge(q, b, c, d, e);
    };
    zE.prototype.ReportParticle = function (b, c, d, e, q) {
      var fa = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      q && "object" === typeof q && (q = q.EB);
      return He(fa, b, c, d, e, q);
    };
    zE.prototype.ShouldQueryParticleSystem = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Ie(c, b);
    };
    zE.prototype.__destroy__ = zE.prototype.HB = function () {
      Je(this.EB);
    };
    function AE() {
      this.EB = Ke();
      g(AE)[this.EB] = this;
    }
    AE.prototype = Object.create(kE.prototype);
    AE.prototype.constructor = AE;
    AE.prototype.FB = AE;
    AE.GB = {};
    a.JSQueryCallback = AE;
    AE.prototype.ReportFixture = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Le(c, b);
    };
    AE.prototype.ReportParticle = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!Me(d, b, c);
    };
    AE.prototype.ShouldQueryParticleSystem = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Ne(c, b);
    };
    AE.prototype.__destroy__ = AE.prototype.HB = function () {
      Oe(this.EB);
    };
    function BE() {
      this.EB = Pe();
      g(BE)[this.EB] = this;
    }
    BE.prototype = Object.create(f.prototype);
    BE.prototype.constructor = BE;
    BE.prototype.FB = BE;
    BE.GB = {};
    a.b2MassData = BE;
    BE.prototype.get_mass = BE.prototype.ZC = function () {
      return Qe(this.EB);
    };
    BE.prototype.set_mass = BE.prototype.ED = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Re(c, b);
    };
    Object.defineProperty(BE.prototype, "mass", {
      get: BE.prototype.ZC,
      set: BE.prototype.ED,
    });
    BE.prototype.get_center = BE.prototype.fE = function () {
      return h(Se(this.EB), n);
    };
    BE.prototype.set_center = BE.prototype.BG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Te(c, b);
    };
    Object.defineProperty(BE.prototype, "center", {
      get: BE.prototype.fE,
      set: BE.prototype.BG,
    });
    BE.prototype.get_I = BE.prototype.RD = function () {
      return Ue(this.EB);
    };
    BE.prototype.set_I = BE.prototype.mG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ve(c, b);
    };
    Object.defineProperty(BE.prototype, "I", {
      get: BE.prototype.RD,
      set: BE.prototype.mG,
    });
    BE.prototype.__destroy__ = BE.prototype.HB = function () {
      We(this.EB);
    };
    function n(b, c) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      this.EB =
        void 0 === b
          ? Xe()
          : void 0 === c
            ? _emscripten_bind_b2Vec2_b2Vec2_1(b)
            : Ye(b, c);
      g(n)[this.EB] = this;
    }
    n.prototype = Object.create(f.prototype);
    n.prototype.constructor = n;
    n.prototype.FB = n;
    n.GB = {};
    a.b2Vec2 = n;
    n.prototype.SetZero = function () {
      Ze(this.EB);
    };
    n.prototype.Set = n.prototype.Set = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      $e(d, b, c);
    };
    n.prototype.op_add = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      af(c, b);
    };
    n.prototype.op_sub = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      bf(c, b);
    };
    n.prototype.op_mul = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cf(c, b);
    };
    n.prototype.Length = function () {
      return df(this.EB);
    };
    n.prototype.LengthSquared = function () {
      return ef(this.EB);
    };
    n.prototype.Normalize = function () {
      return ff(this.EB);
    };
    n.prototype.IsValid = function () {
      return !!gf(this.EB);
    };
    n.prototype.Skew = function () {
      return h(hf(this.EB), n);
    };
    n.prototype.get_x = n.prototype.rC = function () {
      return jf(this.EB);
    };
    n.prototype.set_x = n.prototype.DC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kf(c, b);
    };
    Object.defineProperty(n.prototype, "x", {
      get: n.prototype.rC,
      set: n.prototype.DC,
    });
    n.prototype.get_y = n.prototype.sC = function () {
      return lf(this.EB);
    };
    n.prototype.set_y = n.prototype.EC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mf(c, b);
    };
    Object.defineProperty(n.prototype, "y", {
      get: n.prototype.sC,
      set: n.prototype.EC,
    });
    n.prototype.__destroy__ = n.prototype.HB = function () {
      nf(this.EB);
    };
    function x(b, c, d) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      this.EB =
        void 0 === b
          ? of()
          : void 0 === c
            ? _emscripten_bind_b2Vec3_b2Vec3_1(b)
            : void 0 === d
              ? _emscripten_bind_b2Vec3_b2Vec3_2(b, c)
              : pf(b, c, d);
      g(x)[this.EB] = this;
    }
    x.prototype = Object.create(f.prototype);
    x.prototype.constructor = x;
    x.prototype.FB = x;
    x.GB = {};
    a.b2Vec3 = x;
    x.prototype.SetZero = function () {
      qf(this.EB);
    };
    x.prototype.Set = x.prototype.Set = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      rf(e, b, c, d);
    };
    x.prototype.Length = function () {
      return sf(this.EB);
    };
    x.prototype.Normalize = function () {
      return tf(this.EB);
    };
    x.prototype.op_add = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      uf(c, b);
    };
    x.prototype.op_sub = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vf(c, b);
    };
    x.prototype.op_mul = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wf(c, b);
    };
    x.prototype.get_x = x.prototype.rC = function () {
      return xf(this.EB);
    };
    x.prototype.set_x = x.prototype.DC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yf(c, b);
    };
    Object.defineProperty(x.prototype, "x", {
      get: x.prototype.rC,
      set: x.prototype.DC,
    });
    x.prototype.get_y = x.prototype.sC = function () {
      return zf(this.EB);
    };
    x.prototype.set_y = x.prototype.EC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Af(c, b);
    };
    Object.defineProperty(x.prototype, "y", {
      get: x.prototype.sC,
      set: x.prototype.EC,
    });
    x.prototype.get_z = x.prototype.kD = function () {
      return Bf(this.EB);
    };
    x.prototype.set_z = x.prototype.QD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Cf(c, b);
    };
    Object.defineProperty(x.prototype, "z", {
      get: x.prototype.kD,
      set: x.prototype.QD,
    });
    x.prototype.__destroy__ = x.prototype.HB = function () {
      Df(this.EB);
    };
    function CE(b, c, d, e) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      this.EB =
        void 0 === b
          ? Ef()
          : void 0 === c
            ? _emscripten_bind_b2Vec4_b2Vec4_1(b)
            : void 0 === d
              ? _emscripten_bind_b2Vec4_b2Vec4_2(b, c)
              : void 0 === e
                ? _emscripten_bind_b2Vec4_b2Vec4_3(b, c, d)
                : Ff(b, c, d, e);
      g(CE)[this.EB] = this;
    }
    CE.prototype = Object.create(f.prototype);
    CE.prototype.constructor = CE;
    CE.prototype.FB = CE;
    CE.GB = {};
    a.b2Vec4 = CE;
    CE.prototype.get_x = CE.prototype.rC = function () {
      return Gf(this.EB);
    };
    CE.prototype.set_x = CE.prototype.DC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hf(c, b);
    };
    Object.defineProperty(CE.prototype, "x", {
      get: CE.prototype.rC,
      set: CE.prototype.DC,
    });
    CE.prototype.get_y = CE.prototype.sC = function () {
      return If(this.EB);
    };
    CE.prototype.set_y = CE.prototype.EC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jf(c, b);
    };
    Object.defineProperty(CE.prototype, "y", {
      get: CE.prototype.sC,
      set: CE.prototype.EC,
    });
    CE.prototype.get_z = CE.prototype.kD = function () {
      return Kf(this.EB);
    };
    CE.prototype.set_z = CE.prototype.QD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Lf(c, b);
    };
    Object.defineProperty(CE.prototype, "z", {
      get: CE.prototype.kD,
      set: CE.prototype.QD,
    });
    CE.prototype.get_w = CE.prototype.jG = function () {
      return Mf(this.EB);
    };
    CE.prototype.set_w = CE.prototype.GI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nf(c, b);
    };
    Object.defineProperty(CE.prototype, "w", {
      get: CE.prototype.jG,
      set: CE.prototype.GI,
    });
    CE.prototype.__destroy__ = CE.prototype.HB = function () {
      Of(this.EB);
    };
    function DE() {
      throw "cannot construct a b2BodyUserData, no constructor in IDL";
    }
    DE.prototype = Object.create(f.prototype);
    DE.prototype.constructor = DE;
    DE.prototype.FB = DE;
    DE.GB = {};
    a.b2BodyUserData = DE;
    DE.prototype.get_pointer = DE.prototype.oC = function () {
      return Pf(this.EB);
    };
    DE.prototype.set_pointer = DE.prototype.AC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qf(c, b);
    };
    Object.defineProperty(DE.prototype, "pointer", {
      get: DE.prototype.oC,
      set: DE.prototype.AC,
    });
    DE.prototype.__destroy__ = DE.prototype.HB = function () {
      Rf(this.EB);
    };
    function l() {
      throw "cannot construct a b2Body, no constructor in IDL";
    }
    l.prototype = Object.create(f.prototype);
    l.prototype.constructor = l;
    l.prototype.FB = l;
    l.GB = {};
    a.b2Body = l;
    l.prototype.CreateFixture = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return void 0 === c ? h(Sf(d, b), r) : h(Tf(d, b, c), r);
    };
    l.prototype.DestroyFixture = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Uf(c, b);
    };
    l.prototype.SetTransform = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Vf(d, b, c);
    };
    l.prototype.GetTransform = function () {
      return h(Wf(this.EB), xE);
    };
    l.prototype.GetPosition = function () {
      return h(Xf(this.EB), n);
    };
    l.prototype.GetAngle = function () {
      return Yf(this.EB);
    };
    l.prototype.GetWorldCenter = function () {
      return h(Zf(this.EB), n);
    };
    l.prototype.GetLocalCenter = function () {
      return h($f(this.EB), n);
    };
    l.prototype.SetLinearVelocity = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ag(c, b);
    };
    l.prototype.GetLinearVelocity = function () {
      return h(bg(this.EB), n);
    };
    l.prototype.SetAngularVelocity = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cg(c, b);
    };
    l.prototype.GetAngularVelocity = function () {
      return dg(this.EB);
    };
    l.prototype.ApplyForce = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      eg(e, b, c, d);
    };
    l.prototype.ApplyForceToCenter = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      fg(d, b, c);
    };
    l.prototype.ApplyTorque = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      gg(d, b, c);
    };
    l.prototype.ApplyLinearImpulse = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      hg(e, b, c, d);
    };
    l.prototype.ApplyAngularImpulse = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      ig(d, b, c);
    };
    l.prototype.GetMass = function () {
      return jg(this.EB);
    };
    l.prototype.GetInertia = function () {
      return kg(this.EB);
    };
    l.prototype.GetMassData = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lg(c, b);
    };
    l.prototype.SetMassData = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mg(c, b);
    };
    l.prototype.ResetMassData = function () {
      ng(this.EB);
    };
    l.prototype.GetWorldPoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(og(c, b), n);
    };
    l.prototype.GetWorldVector = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(pg(c, b), n);
    };
    l.prototype.GetLocalPoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(qg(c, b), n);
    };
    l.prototype.GetLocalVector = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(rg(c, b), n);
    };
    l.prototype.GetLinearVelocityFromWorldPoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(sg(c, b), n);
    };
    l.prototype.GetLinearVelocityFromLocalPoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(tg(c, b), n);
    };
    l.prototype.GetLinearDamping = function () {
      return ug(this.EB);
    };
    l.prototype.SetLinearDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vg(c, b);
    };
    l.prototype.GetAngularDamping = function () {
      return wg(this.EB);
    };
    l.prototype.SetAngularDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xg(c, b);
    };
    l.prototype.GetGravityScale = function () {
      return yg(this.EB);
    };
    l.prototype.SetGravityScale = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zg(c, b);
    };
    l.prototype.SetType = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ag(c, b);
    };
    l.prototype.GetType = function () {
      return Bg(this.EB);
    };
    l.prototype.SetBullet = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Cg(c, b);
    };
    l.prototype.IsBullet = function () {
      return !!Dg(this.EB);
    };
    l.prototype.SetSleepingAllowed = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Eg(c, b);
    };
    l.prototype.IsSleepingAllowed = function () {
      return !!Fg(this.EB);
    };
    l.prototype.SetAwake = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Gg(c, b);
    };
    l.prototype.IsAwake = function () {
      return !!Hg(this.EB);
    };
    l.prototype.SetEnabled = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ig(c, b);
    };
    l.prototype.IsEnabled = function () {
      return !!Jg(this.EB);
    };
    l.prototype.SetFixedRotation = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kg(c, b);
    };
    l.prototype.IsFixedRotation = function () {
      return !!Lg(this.EB);
    };
    l.prototype.GetFixtureList = function () {
      return h(Mg(this.EB), r);
    };
    l.prototype.GetJointList = function () {
      return h(Ng(this.EB), y);
    };
    l.prototype.GetContactList = function () {
      return h(Og(this.EB), z);
    };
    l.prototype.GetNext = function () {
      return h(Pg(this.EB), l);
    };
    l.prototype.GetUserData = function () {
      return h(Qg(this.EB), DE);
    };
    l.prototype.GetWorld = function () {
      return h(Rg(this.EB), t);
    };
    l.prototype.Dump = function () {
      Sg(this.EB);
    };
    function A() {
      this.EB = Tg();
      g(A)[this.EB] = this;
    }
    A.prototype = Object.create(f.prototype);
    A.prototype.constructor = A;
    A.prototype.FB = A;
    A.GB = {};
    a.b2BodyDef = A;
    A.prototype.get_type = A.prototype.KB = function () {
      return Ug(this.EB);
    };
    A.prototype.set_type = A.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vg(c, b);
    };
    Object.defineProperty(A.prototype, "type", {
      get: A.prototype.KB,
      set: A.prototype.LB,
    });
    A.prototype.get_position = A.prototype.cC = function () {
      return h(Wg(this.EB), n);
    };
    A.prototype.set_position = A.prototype.fC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Xg(c, b);
    };
    Object.defineProperty(A.prototype, "position", {
      get: A.prototype.cC,
      set: A.prototype.fC,
    });
    A.prototype.get_angle = A.prototype.GC = function () {
      return Yg(this.EB);
    };
    A.prototype.set_angle = A.prototype.lD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Zg(c, b);
    };
    Object.defineProperty(A.prototype, "angle", {
      get: A.prototype.GC,
      set: A.prototype.lD,
    });
    A.prototype.get_linearVelocity = A.prototype.TC = function () {
      return h($g(this.EB), n);
    };
    A.prototype.set_linearVelocity = A.prototype.yD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ah(c, b);
    };
    Object.defineProperty(A.prototype, "linearVelocity", {
      get: A.prototype.TC,
      set: A.prototype.yD,
    });
    A.prototype.get_angularVelocity = A.prototype.HC = function () {
      return bh(this.EB);
    };
    A.prototype.set_angularVelocity = A.prototype.mD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ch(c, b);
    };
    Object.defineProperty(A.prototype, "angularVelocity", {
      get: A.prototype.HC,
      set: A.prototype.mD,
    });
    A.prototype.get_linearDamping = A.prototype.RE = function () {
      return dh(this.EB);
    };
    A.prototype.set_linearDamping = A.prototype.nH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      eh(c, b);
    };
    Object.defineProperty(A.prototype, "linearDamping", {
      get: A.prototype.RE,
      set: A.prototype.nH,
    });
    A.prototype.get_angularDamping = A.prototype.UD = function () {
      return fh(this.EB);
    };
    A.prototype.set_angularDamping = A.prototype.pG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gh(c, b);
    };
    Object.defineProperty(A.prototype, "angularDamping", {
      get: A.prototype.UD,
      set: A.prototype.pG,
    });
    A.prototype.get_allowSleep = A.prototype.TD = function () {
      return !!hh(this.EB);
    };
    A.prototype.set_allowSleep = A.prototype.oG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ih(c, b);
    };
    Object.defineProperty(A.prototype, "allowSleep", {
      get: A.prototype.TD,
      set: A.prototype.oG,
    });
    A.prototype.get_awake = A.prototype.WD = function () {
      return !!jh(this.EB);
    };
    A.prototype.set_awake = A.prototype.rG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kh(c, b);
    };
    Object.defineProperty(A.prototype, "awake", {
      get: A.prototype.WD,
      set: A.prototype.rG,
    });
    A.prototype.get_fixedRotation = A.prototype.tE = function () {
      return !!lh(this.EB);
    };
    A.prototype.set_fixedRotation = A.prototype.PG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mh(c, b);
    };
    Object.defineProperty(A.prototype, "fixedRotation", {
      get: A.prototype.tE,
      set: A.prototype.PG,
    });
    A.prototype.get_bullet = A.prototype.cE = function () {
      return !!nh(this.EB);
    };
    A.prototype.set_bullet = A.prototype.yG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      oh(c, b);
    };
    Object.defineProperty(A.prototype, "bullet", {
      get: A.prototype.cE,
      set: A.prototype.yG,
    });
    A.prototype.get_userData = A.prototype.IB = function () {
      return h(ph(this.EB), DE);
    };
    A.prototype.set_userData = A.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qh(c, b);
    };
    Object.defineProperty(A.prototype, "userData", {
      get: A.prototype.IB,
      set: A.prototype.JB,
    });
    A.prototype.get_gravityScale = A.prototype.PC = function () {
      return rh(this.EB);
    };
    A.prototype.set_gravityScale = A.prototype.uD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      sh(c, b);
    };
    Object.defineProperty(A.prototype, "gravityScale", {
      get: A.prototype.PC,
      set: A.prototype.uD,
    });
    A.prototype.__destroy__ = A.prototype.HB = function () {
      th(this.EB);
    };
    function vE() {
      this.EB = uh();
      g(vE)[this.EB] = this;
    }
    vE.prototype = Object.create(f.prototype);
    vE.prototype.constructor = vE;
    vE.prototype.FB = vE;
    vE.GB = {};
    a.b2Filter = vE;
    vE.prototype.get_categoryBits = vE.prototype.eE = function () {
      return vh(this.EB);
    };
    vE.prototype.set_categoryBits = vE.prototype.AG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wh(c, b);
    };
    Object.defineProperty(vE.prototype, "categoryBits", {
      get: vE.prototype.eE,
      set: vE.prototype.AG,
    });
    vE.prototype.get_maskBits = vE.prototype.fF = function () {
      return xh(this.EB);
    };
    vE.prototype.set_maskBits = vE.prototype.CH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yh(c, b);
    };
    Object.defineProperty(vE.prototype, "maskBits", {
      get: vE.prototype.fF,
      set: vE.prototype.CH,
    });
    vE.prototype.get_groupIndex = vE.prototype.BE = function () {
      return zh(this.EB);
    };
    vE.prototype.set_groupIndex = vE.prototype.YG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ah(c, b);
    };
    Object.defineProperty(vE.prototype, "groupIndex", {
      get: vE.prototype.BE,
      set: vE.prototype.YG,
    });
    vE.prototype.__destroy__ = vE.prototype.HB = function () {
      Bh(this.EB);
    };
    function wE() {
      this.EB = Ch();
      g(wE)[this.EB] = this;
    }
    wE.prototype = Object.create(f.prototype);
    wE.prototype.constructor = wE;
    wE.prototype.FB = wE;
    wE.GB = {};
    a.b2AABB = wE;
    wE.prototype.IsValid = function () {
      return !!Dh(this.EB);
    };
    wE.prototype.GetCenter = function () {
      return h(Eh(this.EB), n);
    };
    wE.prototype.GetExtents = function () {
      return h(Fh(this.EB), n);
    };
    wE.prototype.GetPerimeter = function () {
      return Gh(this.EB);
    };
    wE.prototype.Combine = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      void 0 === c ? Hh(d, b) : Ih(d, b, c);
    };
    wE.prototype.Contains = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Jh(c, b);
    };
    wE.prototype.RayCast = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!Kh(d, b, c);
    };
    wE.prototype.get_lowerBound = wE.prototype.VE = function () {
      return h(Lh(this.EB), n);
    };
    wE.prototype.set_lowerBound = wE.prototype.rH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Mh(c, b);
    };
    Object.defineProperty(wE.prototype, "lowerBound", {
      get: wE.prototype.VE,
      set: wE.prototype.rH,
    });
    wE.prototype.get_upperBound = wE.prototype.eG = function () {
      return h(Nh(this.EB), n);
    };
    wE.prototype.set_upperBound = wE.prototype.BI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Oh(c, b);
    };
    Object.defineProperty(wE.prototype, "upperBound", {
      get: wE.prototype.eG,
      set: wE.prototype.BI,
    });
    wE.prototype.__destroy__ = wE.prototype.HB = function () {
      Ph(this.EB);
    };
    function EE() {
      this.EB = Qh();
      g(EE)[this.EB] = this;
    }
    EE.prototype = Object.create(iE.prototype);
    EE.prototype.constructor = EE;
    EE.prototype.FB = EE;
    EE.GB = {};
    a.b2CircleShape = EE;
    EE.prototype.GetType = function () {
      return Rh(this.EB);
    };
    EE.prototype.GetChildCount = function () {
      return Sh(this.EB);
    };
    EE.prototype.TestPoint = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!Th(d, b, c);
    };
    EE.prototype.RayCast = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      return !!Uh(q, b, c, d, e);
    };
    EE.prototype.ComputeAABB = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Vh(e, b, c, d);
    };
    EE.prototype.ComputeMass = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Wh(d, b, c);
    };
    EE.prototype.get_m_p = EE.prototype.$E = function () {
      return h(Xh(this.EB), n);
    };
    EE.prototype.set_m_p = EE.prototype.wH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Yh(c, b);
    };
    Object.defineProperty(EE.prototype, "m_p", {
      get: EE.prototype.$E,
      set: EE.prototype.wH,
    });
    EE.prototype.get_m_type = EE.prototype.YB = function () {
      return Zh(this.EB);
    };
    EE.prototype.set_m_type = EE.prototype.aC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $h(c, b);
    };
    Object.defineProperty(EE.prototype, "m_type", {
      get: EE.prototype.YB,
      set: EE.prototype.aC,
    });
    EE.prototype.get_m_radius = EE.prototype.XB = function () {
      return ai(this.EB);
    };
    EE.prototype.set_m_radius = EE.prototype.$B = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      bi(c, b);
    };
    Object.defineProperty(EE.prototype, "m_radius", {
      get: EE.prototype.XB,
      set: EE.prototype.$B,
    });
    EE.prototype.__destroy__ = EE.prototype.HB = function () {
      ci(this.EB);
    };
    function B() {
      this.EB = di();
      g(B)[this.EB] = this;
    }
    B.prototype = Object.create(iE.prototype);
    B.prototype.constructor = B;
    B.prototype.FB = B;
    B.GB = {};
    a.b2EdgeShape = B;
    B.prototype.SetOneSided = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      ei(q, b, c, d, e);
    };
    B.prototype.SetTwoSided = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      fi(d, b, c);
    };
    B.prototype.GetType = function () {
      return gi(this.EB);
    };
    B.prototype.GetChildCount = function () {
      return hi(this.EB);
    };
    B.prototype.TestPoint = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!ii(d, b, c);
    };
    B.prototype.RayCast = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      return !!ji(q, b, c, d, e);
    };
    B.prototype.ComputeAABB = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      ki(e, b, c, d);
    };
    B.prototype.ComputeMass = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      li(d, b, c);
    };
    B.prototype.get_m_vertex1 = B.prototype.cF = function () {
      return h(mi(this.EB), n);
    };
    B.prototype.set_m_vertex1 = B.prototype.zH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ni(c, b);
    };
    Object.defineProperty(B.prototype, "m_vertex1", {
      get: B.prototype.cF,
      set: B.prototype.zH,
    });
    B.prototype.get_m_vertex2 = B.prototype.dF = function () {
      return h(oi(this.EB), n);
    };
    B.prototype.set_m_vertex2 = B.prototype.AH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pi(c, b);
    };
    Object.defineProperty(B.prototype, "m_vertex2", {
      get: B.prototype.dF,
      set: B.prototype.AH,
    });
    B.prototype.get_m_vertex0 = B.prototype.bF = function () {
      return h(qi(this.EB), n);
    };
    B.prototype.set_m_vertex0 = B.prototype.yH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ri(c, b);
    };
    Object.defineProperty(B.prototype, "m_vertex0", {
      get: B.prototype.bF,
      set: B.prototype.yH,
    });
    B.prototype.get_m_vertex3 = B.prototype.eF = function () {
      return h(si(this.EB), n);
    };
    B.prototype.set_m_vertex3 = B.prototype.BH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ti(c, b);
    };
    Object.defineProperty(B.prototype, "m_vertex3", {
      get: B.prototype.eF,
      set: B.prototype.BH,
    });
    B.prototype.get_m_oneSided = B.prototype.ZE = function () {
      return !!ui(this.EB);
    };
    B.prototype.set_m_oneSided = B.prototype.vH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vi(c, b);
    };
    Object.defineProperty(B.prototype, "m_oneSided", {
      get: B.prototype.ZE,
      set: B.prototype.vH,
    });
    B.prototype.get_m_type = B.prototype.YB = function () {
      return wi(this.EB);
    };
    B.prototype.set_m_type = B.prototype.aC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xi(c, b);
    };
    Object.defineProperty(B.prototype, "m_type", {
      get: B.prototype.YB,
      set: B.prototype.aC,
    });
    B.prototype.get_m_radius = B.prototype.XB = function () {
      return yi(this.EB);
    };
    B.prototype.set_m_radius = B.prototype.$B = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zi(c, b);
    };
    Object.defineProperty(B.prototype, "m_radius", {
      get: B.prototype.XB,
      set: B.prototype.$B,
    });
    B.prototype.__destroy__ = B.prototype.HB = function () {
      Ai(this.EB);
    };
    function lE() {
      throw "cannot construct a b2JointUserData, no constructor in IDL";
    }
    lE.prototype = Object.create(f.prototype);
    lE.prototype.constructor = lE;
    lE.prototype.FB = lE;
    lE.GB = {};
    a.b2JointUserData = lE;
    lE.prototype.get_pointer = lE.prototype.oC = function () {
      return Bi(this.EB);
    };
    lE.prototype.set_pointer = lE.prototype.AC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ci(c, b);
    };
    Object.defineProperty(lE.prototype, "pointer", {
      get: lE.prototype.oC,
      set: lE.prototype.AC,
    });
    lE.prototype.__destroy__ = lE.prototype.HB = function () {
      Di(this.EB);
    };
    function FE() {
      throw "cannot construct a b2WeldJoint, no constructor in IDL";
    }
    FE.prototype = Object.create(m.prototype);
    FE.prototype.constructor = FE;
    FE.prototype.FB = FE;
    FE.GB = {};
    a.b2WeldJoint = FE;
    FE.prototype.GetLocalAnchorA = function () {
      return h(Ei(this.EB), n);
    };
    FE.prototype.GetLocalAnchorB = function () {
      return h(Fi(this.EB), n);
    };
    FE.prototype.GetReferenceAngle = function () {
      return Gi(this.EB);
    };
    FE.prototype.SetStiffness = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hi(c, b);
    };
    FE.prototype.GetStiffness = function () {
      return Ii(this.EB);
    };
    FE.prototype.SetDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ji(c, b);
    };
    FE.prototype.GetDamping = function () {
      return Ki(this.EB);
    };
    FE.prototype.Dump = function () {
      Li(this.EB);
    };
    FE.prototype.GetType = function () {
      return Mi(this.EB);
    };
    FE.prototype.GetBodyA = function () {
      return h(Ni(this.EB), l);
    };
    FE.prototype.GetBodyB = function () {
      return h(Oi(this.EB), l);
    };
    FE.prototype.GetAnchorA = function () {
      return h(Pi(this.EB), n);
    };
    FE.prototype.GetAnchorB = function () {
      return h(Qi(this.EB), n);
    };
    FE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Ri(c, b), n);
    };
    FE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Si(c, b);
    };
    FE.prototype.GetNext = function () {
      return h(Ti(this.EB), m);
    };
    FE.prototype.GetUserData = function () {
      return h(Ui(this.EB), lE);
    };
    FE.prototype.GetCollideConnected = function () {
      return !!Vi(this.EB);
    };
    FE.prototype.__destroy__ = FE.prototype.HB = function () {
      Wi(this.EB);
    };
    function C() {
      this.EB = Xi();
      g(C)[this.EB] = this;
    }
    C.prototype = Object.create(k.prototype);
    C.prototype.constructor = C;
    C.prototype.FB = C;
    C.GB = {};
    a.b2WeldJointDef = C;
    C.prototype.Initialize = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Yi(e, b, c, d);
    };
    C.prototype.get_localAnchorA = C.prototype.SB = function () {
      return h(Zi(this.EB), n);
    };
    C.prototype.set_localAnchorA = C.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $i(c, b);
    };
    Object.defineProperty(C.prototype, "localAnchorA", {
      get: C.prototype.SB,
      set: C.prototype.UB,
    });
    C.prototype.get_localAnchorB = C.prototype.TB = function () {
      return h(aj(this.EB), n);
    };
    C.prototype.set_localAnchorB = C.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      bj(c, b);
    };
    Object.defineProperty(C.prototype, "localAnchorB", {
      get: C.prototype.TB,
      set: C.prototype.VB,
    });
    C.prototype.get_referenceAngle = C.prototype.pC = function () {
      return cj(this.EB);
    };
    C.prototype.set_referenceAngle = C.prototype.BC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dj(c, b);
    };
    Object.defineProperty(C.prototype, "referenceAngle", {
      get: C.prototype.pC,
      set: C.prototype.BC,
    });
    C.prototype.get_stiffness = C.prototype.dC = function () {
      return ej(this.EB);
    };
    C.prototype.set_stiffness = C.prototype.gC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fj(c, b);
    };
    Object.defineProperty(C.prototype, "stiffness", {
      get: C.prototype.dC,
      set: C.prototype.gC,
    });
    C.prototype.get_damping = C.prototype.WB = function () {
      return gj(this.EB);
    };
    C.prototype.set_damping = C.prototype.ZB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hj(c, b);
    };
    Object.defineProperty(C.prototype, "damping", {
      get: C.prototype.WB,
      set: C.prototype.ZB,
    });
    C.prototype.get_type = C.prototype.KB = function () {
      return ij(this.EB);
    };
    C.prototype.set_type = C.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jj(c, b);
    };
    Object.defineProperty(C.prototype, "type", {
      get: C.prototype.KB,
      set: C.prototype.LB,
    });
    C.prototype.get_userData = C.prototype.IB = function () {
      return h(kj(this.EB), lE);
    };
    C.prototype.set_userData = C.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lj(c, b);
    };
    Object.defineProperty(C.prototype, "userData", {
      get: C.prototype.IB,
      set: C.prototype.JB,
    });
    C.prototype.get_bodyA = C.prototype.MB = function () {
      return h(mj(this.EB), l);
    };
    C.prototype.set_bodyA = C.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      nj(c, b);
    };
    Object.defineProperty(C.prototype, "bodyA", {
      get: C.prototype.MB,
      set: C.prototype.PB,
    });
    C.prototype.get_bodyB = C.prototype.NB = function () {
      return h(oj(this.EB), l);
    };
    C.prototype.set_bodyB = C.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pj(c, b);
    };
    Object.defineProperty(C.prototype, "bodyB", {
      get: C.prototype.NB,
      set: C.prototype.QB,
    });
    C.prototype.get_collideConnected = C.prototype.OB = function () {
      return !!qj(this.EB);
    };
    C.prototype.set_collideConnected = C.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rj(c, b);
    };
    Object.defineProperty(C.prototype, "collideConnected", {
      get: C.prototype.OB,
      set: C.prototype.RB,
    });
    C.prototype.__destroy__ = C.prototype.HB = function () {
      sj(this.EB);
    };
    function D() {
      this.EB = tj();
      g(D)[this.EB] = this;
    }
    D.prototype = Object.create(iE.prototype);
    D.prototype.constructor = D;
    D.prototype.FB = D;
    D.GB = {};
    a.b2ChainShape = D;
    D.prototype.Clear = function () {
      uj(this.EB);
    };
    D.prototype.CreateLoop = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      vj(d, b, c);
    };
    D.prototype.CreateChain = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      wj(q, b, c, d, e);
    };
    D.prototype.GetChildEdge = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      xj(d, b, c);
    };
    D.prototype.GetType = function () {
      return yj(this.EB);
    };
    D.prototype.GetChildCount = function () {
      return zj(this.EB);
    };
    D.prototype.TestPoint = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!Aj(d, b, c);
    };
    D.prototype.RayCast = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      return !!Bj(q, b, c, d, e);
    };
    D.prototype.ComputeAABB = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Cj(e, b, c, d);
    };
    D.prototype.ComputeMass = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Dj(d, b, c);
    };
    D.prototype.get_m_vertices = D.prototype.YC = function () {
      return h(Ej(this.EB), n);
    };
    D.prototype.set_m_vertices = D.prototype.DD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fj(c, b);
    };
    Object.defineProperty(D.prototype, "m_vertices", {
      get: D.prototype.YC,
      set: D.prototype.DD,
    });
    D.prototype.get_m_count = D.prototype.XC = function () {
      return Gj(this.EB);
    };
    D.prototype.set_m_count = D.prototype.CD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hj(c, b);
    };
    Object.defineProperty(D.prototype, "m_count", {
      get: D.prototype.XC,
      set: D.prototype.CD,
    });
    D.prototype.get_m_prevVertex = D.prototype.aF = function () {
      return h(Ij(this.EB), n);
    };
    D.prototype.set_m_prevVertex = D.prototype.xH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jj(c, b);
    };
    Object.defineProperty(D.prototype, "m_prevVertex", {
      get: D.prototype.aF,
      set: D.prototype.xH,
    });
    D.prototype.get_m_nextVertex = D.prototype.XE = function () {
      return h(Kj(this.EB), n);
    };
    D.prototype.set_m_nextVertex = D.prototype.tH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Lj(c, b);
    };
    Object.defineProperty(D.prototype, "m_nextVertex", {
      get: D.prototype.XE,
      set: D.prototype.tH,
    });
    D.prototype.get_m_type = D.prototype.YB = function () {
      return Mj(this.EB);
    };
    D.prototype.set_m_type = D.prototype.aC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nj(c, b);
    };
    Object.defineProperty(D.prototype, "m_type", {
      get: D.prototype.YB,
      set: D.prototype.aC,
    });
    D.prototype.get_m_radius = D.prototype.XB = function () {
      return Oj(this.EB);
    };
    D.prototype.set_m_radius = D.prototype.$B = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pj(c, b);
    };
    Object.defineProperty(D.prototype, "m_radius", {
      get: D.prototype.XB,
      set: D.prototype.$B,
    });
    D.prototype.__destroy__ = D.prototype.HB = function () {
      Qj(this.EB);
    };
    function GE(b, c, d) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      this.EB =
        void 0 === b
          ? Rj()
          : void 0 === c
            ? _emscripten_bind_b2Color_b2Color_1(b)
            : void 0 === d
              ? _emscripten_bind_b2Color_b2Color_2(b, c)
              : Sj(b, c, d);
      g(GE)[this.EB] = this;
    }
    GE.prototype = Object.create(f.prototype);
    GE.prototype.constructor = GE;
    GE.prototype.FB = GE;
    GE.GB = {};
    a.b2Color = GE;
    GE.prototype.Set = GE.prototype.Set = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Tj(e, b, c, d);
    };
    GE.prototype.get_r = GE.prototype.fD = function () {
      return Uj(this.EB);
    };
    GE.prototype.set_r = GE.prototype.LD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vj(c, b);
    };
    Object.defineProperty(GE.prototype, "r", {
      get: GE.prototype.fD,
      set: GE.prototype.LD,
    });
    GE.prototype.get_g = GE.prototype.OC = function () {
      return Wj(this.EB);
    };
    GE.prototype.set_g = GE.prototype.tD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Xj(c, b);
    };
    Object.defineProperty(GE.prototype, "g", {
      get: GE.prototype.OC,
      set: GE.prototype.tD,
    });
    GE.prototype.get_b = GE.prototype.IC = function () {
      return Yj(this.EB);
    };
    GE.prototype.set_b = GE.prototype.nD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Zj(c, b);
    };
    Object.defineProperty(GE.prototype, "b", {
      get: GE.prototype.IC,
      set: GE.prototype.nD,
    });
    GE.prototype.__destroy__ = GE.prototype.HB = function () {
      ak(this.EB);
    };
    function z() {
      this.EB = bk();
      g(z)[this.EB] = this;
    }
    z.prototype = Object.create(f.prototype);
    z.prototype.constructor = z;
    z.prototype.FB = z;
    z.GB = {};
    a.b2ContactEdge = z;
    z.prototype.get_other = z.prototype.cD = function () {
      return h(ck(this.EB), l);
    };
    z.prototype.set_other = z.prototype.ID = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dk(c, b);
    };
    Object.defineProperty(z.prototype, "other", {
      get: z.prototype.cD,
      set: z.prototype.ID,
    });
    z.prototype.get_contact = z.prototype.jE = function () {
      return h(ek(this.EB), qE);
    };
    z.prototype.set_contact = z.prototype.FG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fk(c, b);
    };
    Object.defineProperty(z.prototype, "contact", {
      get: z.prototype.jE,
      set: z.prototype.FG,
    });
    z.prototype.get_prev = z.prototype.eD = function () {
      return h(gk(this.EB), z);
    };
    z.prototype.set_prev = z.prototype.KD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hk(c, b);
    };
    Object.defineProperty(z.prototype, "prev", {
      get: z.prototype.eD,
      set: z.prototype.KD,
    });
    z.prototype.get_next = z.prototype.bD = function () {
      return h(ik(this.EB), z);
    };
    z.prototype.set_next = z.prototype.HD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jk(c, b);
    };
    Object.defineProperty(z.prototype, "next", {
      get: z.prototype.bD,
      set: z.prototype.HD,
    });
    z.prototype.__destroy__ = z.prototype.HB = function () {
      kk(this.EB);
    };
    function HE() {
      throw "cannot construct a b2ContactFeature, no constructor in IDL";
    }
    HE.prototype = Object.create(f.prototype);
    HE.prototype.constructor = HE;
    HE.prototype.FB = HE;
    HE.GB = {};
    a.b2ContactFeature = HE;
    HE.prototype.get_indexA = HE.prototype.jC = function () {
      return lk(this.EB);
    };
    HE.prototype.set_indexA = HE.prototype.vC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mk(c, b);
    };
    Object.defineProperty(HE.prototype, "indexA", {
      get: HE.prototype.jC,
      set: HE.prototype.vC,
    });
    HE.prototype.get_indexB = HE.prototype.kC = function () {
      return nk(this.EB);
    };
    HE.prototype.set_indexB = HE.prototype.wC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ok(c, b);
    };
    Object.defineProperty(HE.prototype, "indexB", {
      get: HE.prototype.kC,
      set: HE.prototype.wC,
    });
    HE.prototype.get_typeA = HE.prototype.bG = function () {
      return pk(this.EB);
    };
    HE.prototype.set_typeA = HE.prototype.yI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qk(c, b);
    };
    Object.defineProperty(HE.prototype, "typeA", {
      get: HE.prototype.bG,
      set: HE.prototype.yI,
    });
    HE.prototype.get_typeB = HE.prototype.cG = function () {
      return rk(this.EB);
    };
    HE.prototype.set_typeB = HE.prototype.zI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      sk(c, b);
    };
    Object.defineProperty(HE.prototype, "typeB", {
      get: HE.prototype.cG,
      set: HE.prototype.zI,
    });
    HE.prototype.__destroy__ = HE.prototype.HB = function () {
      tk(this.EB);
    };
    function IE() {
      throw "cannot construct a b2ContactFilter, no constructor in IDL";
    }
    IE.prototype = Object.create(f.prototype);
    IE.prototype.constructor = IE;
    IE.prototype.FB = IE;
    IE.GB = {};
    a.b2ContactFilter = IE;
    IE.prototype.__destroy__ = IE.prototype.HB = function () {
      uk(this.EB);
    };
    function JE() {
      this.EB = vk();
      g(JE)[this.EB] = this;
    }
    JE.prototype = Object.create(mE.prototype);
    JE.prototype.constructor = JE;
    JE.prototype.FB = JE;
    JE.GB = {};
    a.JSContactFilter = JE;
    JE.prototype.ShouldCollide = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!wk(d, b, c);
    };
    JE.prototype.ShouldCollideFixtureParticleSystemIndex = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      return !!xk(e, b, c, d);
    };
    JE.prototype.ShouldCollideParticleSystemIndexIndex = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      return !!yk(e, b, c, d);
    };
    JE.prototype.__destroy__ = JE.prototype.HB = function () {
      zk(this.EB);
    };
    function KE() {
      throw "cannot construct a b2ContactID, no constructor in IDL";
    }
    KE.prototype = Object.create(f.prototype);
    KE.prototype.constructor = KE;
    KE.prototype.FB = KE;
    KE.GB = {};
    a.b2ContactID = KE;
    KE.prototype.get_cf = KE.prototype.gE = function () {
      return h(Ak(this.EB), HE);
    };
    KE.prototype.set_cf = KE.prototype.CG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bk(c, b);
    };
    Object.defineProperty(KE.prototype, "cf", {
      get: KE.prototype.gE,
      set: KE.prototype.CG,
    });
    KE.prototype.get_key = KE.prototype.ME = function () {
      return Ck(this.EB);
    };
    KE.prototype.set_key = KE.prototype.iH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Dk(c, b);
    };
    Object.defineProperty(KE.prototype, "key", {
      get: KE.prototype.ME,
      set: KE.prototype.iH,
    });
    KE.prototype.__destroy__ = KE.prototype.HB = function () {
      Ek(this.EB);
    };
    function LE() {
      throw "cannot construct a b2ContactImpulse, no constructor in IDL";
    }
    LE.prototype = Object.create(f.prototype);
    LE.prototype.constructor = LE;
    LE.prototype.FB = LE;
    LE.GB = {};
    a.b2ContactImpulse = LE;
    LE.prototype.get_normalImpulses = LE.prototype.nF = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Fk(c, b);
    };
    LE.prototype.set_normalImpulses = LE.prototype.KH = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Gk(d, b, c);
    };
    Object.defineProperty(LE.prototype, "normalImpulses", {
      get: LE.prototype.nF,
      set: LE.prototype.KH,
    });
    LE.prototype.get_tangentImpulses = LE.prototype.ZF = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Hk(c, b);
    };
    LE.prototype.set_tangentImpulses = LE.prototype.vI = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Ik(d, b, c);
    };
    Object.defineProperty(LE.prototype, "tangentImpulses", {
      get: LE.prototype.ZF,
      set: LE.prototype.vI,
    });
    LE.prototype.get_count = LE.prototype.KC = function () {
      return Jk(this.EB);
    };
    LE.prototype.set_count = LE.prototype.pD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kk(c, b);
    };
    Object.defineProperty(LE.prototype, "count", {
      get: LE.prototype.KC,
      set: LE.prototype.pD,
    });
    LE.prototype.__destroy__ = LE.prototype.HB = function () {
      Lk(this.EB);
    };
    function ME() {
      throw "cannot construct a b2DestructionListener, no constructor in IDL";
    }
    ME.prototype = Object.create(f.prototype);
    ME.prototype.constructor = ME;
    ME.prototype.FB = ME;
    ME.GB = {};
    a.b2DestructionListener = ME;
    ME.prototype.__destroy__ = ME.prototype.HB = function () {
      Mk(this.EB);
    };
    function NE() {
      this.EB = Nk();
      g(NE)[this.EB] = this;
    }
    NE.prototype = Object.create(nE.prototype);
    NE.prototype.constructor = NE;
    NE.prototype.FB = NE;
    NE.GB = {};
    a.JSDestructionListener = NE;
    NE.prototype.SayGoodbyeJoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ok(c, b);
    };
    NE.prototype.SayGoodbyeFixture = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pk(c, b);
    };
    NE.prototype.SayGoodbyeParticleGroup = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qk(c, b);
    };
    NE.prototype.SayGoodbyeParticleSystemIndex = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Rk(d, b, c);
    };
    NE.prototype.__destroy__ = NE.prototype.HB = function () {
      Sk(this.EB);
    };
    function OE() {
      throw "cannot construct a b2DistanceJoint, no constructor in IDL";
    }
    OE.prototype = Object.create(m.prototype);
    OE.prototype.constructor = OE;
    OE.prototype.FB = OE;
    OE.GB = {};
    a.b2DistanceJoint = OE;
    OE.prototype.GetLocalAnchorA = function () {
      return h(Tk(this.EB), n);
    };
    OE.prototype.GetLocalAnchorB = function () {
      return h(Uk(this.EB), n);
    };
    OE.prototype.GetLength = function () {
      return Vk(this.EB);
    };
    OE.prototype.SetLength = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Wk(c, b);
    };
    OE.prototype.GetMinLength = function () {
      return Xk(this.EB);
    };
    OE.prototype.SetMinLength = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Yk(c, b);
    };
    OE.prototype.GetMaxLength = function () {
      return Zk(this.EB);
    };
    OE.prototype.SetMaxLength = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $k(c, b);
    };
    OE.prototype.GetCurrentLength = function () {
      return al(this.EB);
    };
    OE.prototype.SetStiffness = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      bl(c, b);
    };
    OE.prototype.GetStiffness = function () {
      return cl(this.EB);
    };
    OE.prototype.SetDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dl(c, b);
    };
    OE.prototype.GetDamping = function () {
      return el(this.EB);
    };
    OE.prototype.GetType = function () {
      return fl(this.EB);
    };
    OE.prototype.GetBodyA = function () {
      return h(gl(this.EB), l);
    };
    OE.prototype.GetBodyB = function () {
      return h(hl(this.EB), l);
    };
    OE.prototype.GetAnchorA = function () {
      return h(il(this.EB), n);
    };
    OE.prototype.GetAnchorB = function () {
      return h(jl(this.EB), n);
    };
    OE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(kl(c, b), n);
    };
    OE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return ll(c, b);
    };
    OE.prototype.GetNext = function () {
      return h(ml(this.EB), m);
    };
    OE.prototype.GetUserData = function () {
      return h(nl(this.EB), lE);
    };
    OE.prototype.GetCollideConnected = function () {
      return !!ol(this.EB);
    };
    OE.prototype.__destroy__ = OE.prototype.HB = function () {
      pl(this.EB);
    };
    function E() {
      this.EB = ql();
      g(E)[this.EB] = this;
    }
    E.prototype = Object.create(k.prototype);
    E.prototype.constructor = E;
    E.prototype.FB = E;
    E.GB = {};
    a.b2DistanceJointDef = E;
    E.prototype.Initialize = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      rl(q, b, c, d, e);
    };
    E.prototype.get_localAnchorA = E.prototype.SB = function () {
      return h(sl(this.EB), n);
    };
    E.prototype.set_localAnchorA = E.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      tl(c, b);
    };
    Object.defineProperty(E.prototype, "localAnchorA", {
      get: E.prototype.SB,
      set: E.prototype.UB,
    });
    E.prototype.get_localAnchorB = E.prototype.TB = function () {
      return h(ul(this.EB), n);
    };
    E.prototype.set_localAnchorB = E.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vl(c, b);
    };
    Object.defineProperty(E.prototype, "localAnchorB", {
      get: E.prototype.TB,
      set: E.prototype.VB,
    });
    E.prototype.get_length = E.prototype.NE = function () {
      return wl(this.EB);
    };
    E.prototype.set_length = E.prototype.jH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xl(c, b);
    };
    Object.defineProperty(E.prototype, "length", {
      get: E.prototype.NE,
      set: E.prototype.jH,
    });
    E.prototype.get_minLength = E.prototype.lF = function () {
      return yl(this.EB);
    };
    E.prototype.set_minLength = E.prototype.IH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zl(c, b);
    };
    Object.defineProperty(E.prototype, "minLength", {
      get: E.prototype.lF,
      set: E.prototype.IH,
    });
    E.prototype.get_maxLength = E.prototype.jF = function () {
      return Al(this.EB);
    };
    E.prototype.set_maxLength = E.prototype.GH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bl(c, b);
    };
    Object.defineProperty(E.prototype, "maxLength", {
      get: E.prototype.jF,
      set: E.prototype.GH,
    });
    E.prototype.get_stiffness = E.prototype.dC = function () {
      return Cl(this.EB);
    };
    E.prototype.set_stiffness = E.prototype.gC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Dl(c, b);
    };
    Object.defineProperty(E.prototype, "stiffness", {
      get: E.prototype.dC,
      set: E.prototype.gC,
    });
    E.prototype.get_damping = E.prototype.WB = function () {
      return El(this.EB);
    };
    E.prototype.set_damping = E.prototype.ZB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fl(c, b);
    };
    Object.defineProperty(E.prototype, "damping", {
      get: E.prototype.WB,
      set: E.prototype.ZB,
    });
    E.prototype.get_type = E.prototype.KB = function () {
      return Gl(this.EB);
    };
    E.prototype.set_type = E.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hl(c, b);
    };
    Object.defineProperty(E.prototype, "type", {
      get: E.prototype.KB,
      set: E.prototype.LB,
    });
    E.prototype.get_userData = E.prototype.IB = function () {
      return h(Il(this.EB), lE);
    };
    E.prototype.set_userData = E.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jl(c, b);
    };
    Object.defineProperty(E.prototype, "userData", {
      get: E.prototype.IB,
      set: E.prototype.JB,
    });
    E.prototype.get_bodyA = E.prototype.MB = function () {
      return h(Kl(this.EB), l);
    };
    E.prototype.set_bodyA = E.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ll(c, b);
    };
    Object.defineProperty(E.prototype, "bodyA", {
      get: E.prototype.MB,
      set: E.prototype.PB,
    });
    E.prototype.get_bodyB = E.prototype.NB = function () {
      return h(Ml(this.EB), l);
    };
    E.prototype.set_bodyB = E.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nl(c, b);
    };
    Object.defineProperty(E.prototype, "bodyB", {
      get: E.prototype.NB,
      set: E.prototype.QB,
    });
    E.prototype.get_collideConnected = E.prototype.OB = function () {
      return !!Ol(this.EB);
    };
    E.prototype.set_collideConnected = E.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pl(c, b);
    };
    Object.defineProperty(E.prototype, "collideConnected", {
      get: E.prototype.OB,
      set: E.prototype.RB,
    });
    E.prototype.__destroy__ = E.prototype.HB = function () {
      Ql(this.EB);
    };
    function PE() {
      this.EB = Rl();
      g(PE)[this.EB] = this;
    }
    PE.prototype = Object.create(oE.prototype);
    PE.prototype.constructor = PE;
    PE.prototype.FB = PE;
    PE.GB = {};
    a.JSDraw = PE;
    PE.prototype.DrawPolygon = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Sl(e, b, c, d);
    };
    PE.prototype.DrawSolidPolygon = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Tl(e, b, c, d);
    };
    PE.prototype.DrawCircle = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Ul(e, b, c, d);
    };
    PE.prototype.DrawSolidCircle = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      Vl(q, b, c, d, e);
    };
    PE.prototype.DrawParticles = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      Wl(q, b, c, d, e);
    };
    PE.prototype.DrawSegment = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Xl(e, b, c, d);
    };
    PE.prototype.DrawTransform = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Yl(c, b);
    };
    PE.prototype.DrawPoint = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Zl(e, b, c, d);
    };
    PE.prototype.__destroy__ = PE.prototype.HB = function () {
      $l(this.EB);
    };
    function QE() {
      throw "cannot construct a b2FrictionJoint, no constructor in IDL";
    }
    QE.prototype = Object.create(m.prototype);
    QE.prototype.constructor = QE;
    QE.prototype.FB = QE;
    QE.GB = {};
    a.b2FrictionJoint = QE;
    QE.prototype.GetLocalAnchorA = function () {
      return h(am(this.EB), n);
    };
    QE.prototype.GetLocalAnchorB = function () {
      return h(bm(this.EB), n);
    };
    QE.prototype.SetMaxForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cm(c, b);
    };
    QE.prototype.GetMaxForce = function () {
      return dm(this.EB);
    };
    QE.prototype.SetMaxTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      em(c, b);
    };
    QE.prototype.GetMaxTorque = function () {
      return fm(this.EB);
    };
    QE.prototype.GetType = function () {
      return gm(this.EB);
    };
    QE.prototype.GetBodyA = function () {
      return h(hm(this.EB), l);
    };
    QE.prototype.GetBodyB = function () {
      return h(im(this.EB), l);
    };
    QE.prototype.GetAnchorA = function () {
      return h(jm(this.EB), n);
    };
    QE.prototype.GetAnchorB = function () {
      return h(km(this.EB), n);
    };
    QE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(lm(c, b), n);
    };
    QE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return mm(c, b);
    };
    QE.prototype.GetNext = function () {
      return h(nm(this.EB), m);
    };
    QE.prototype.GetUserData = function () {
      return h(om(this.EB), lE);
    };
    QE.prototype.GetCollideConnected = function () {
      return !!pm(this.EB);
    };
    QE.prototype.__destroy__ = QE.prototype.HB = function () {
      qm(this.EB);
    };
    function F() {
      this.EB = rm();
      g(F)[this.EB] = this;
    }
    F.prototype = Object.create(k.prototype);
    F.prototype.constructor = F;
    F.prototype.FB = F;
    F.GB = {};
    a.b2FrictionJointDef = F;
    F.prototype.Initialize = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      sm(e, b, c, d);
    };
    F.prototype.get_localAnchorA = F.prototype.SB = function () {
      return h(tm(this.EB), n);
    };
    F.prototype.set_localAnchorA = F.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      um(c, b);
    };
    Object.defineProperty(F.prototype, "localAnchorA", {
      get: F.prototype.SB,
      set: F.prototype.UB,
    });
    F.prototype.get_localAnchorB = F.prototype.TB = function () {
      return h(wm(this.EB), n);
    };
    F.prototype.set_localAnchorB = F.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xm(c, b);
    };
    Object.defineProperty(F.prototype, "localAnchorB", {
      get: F.prototype.TB,
      set: F.prototype.VB,
    });
    F.prototype.get_maxForce = F.prototype.lC = function () {
      return ym(this.EB);
    };
    F.prototype.set_maxForce = F.prototype.xC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zm(c, b);
    };
    Object.defineProperty(F.prototype, "maxForce", {
      get: F.prototype.lC,
      set: F.prototype.xC,
    });
    F.prototype.get_maxTorque = F.prototype.aD = function () {
      return Am(this.EB);
    };
    F.prototype.set_maxTorque = F.prototype.GD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bm(c, b);
    };
    Object.defineProperty(F.prototype, "maxTorque", {
      get: F.prototype.aD,
      set: F.prototype.GD,
    });
    F.prototype.get_type = F.prototype.KB = function () {
      return Cm(this.EB);
    };
    F.prototype.set_type = F.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Dm(c, b);
    };
    Object.defineProperty(F.prototype, "type", {
      get: F.prototype.KB,
      set: F.prototype.LB,
    });
    F.prototype.get_userData = F.prototype.IB = function () {
      return h(Em(this.EB), lE);
    };
    F.prototype.set_userData = F.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fm(c, b);
    };
    Object.defineProperty(F.prototype, "userData", {
      get: F.prototype.IB,
      set: F.prototype.JB,
    });
    F.prototype.get_bodyA = F.prototype.MB = function () {
      return h(Gm(this.EB), l);
    };
    F.prototype.set_bodyA = F.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hm(c, b);
    };
    Object.defineProperty(F.prototype, "bodyA", {
      get: F.prototype.MB,
      set: F.prototype.PB,
    });
    F.prototype.get_bodyB = F.prototype.NB = function () {
      return h(Im(this.EB), l);
    };
    F.prototype.set_bodyB = F.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jm(c, b);
    };
    Object.defineProperty(F.prototype, "bodyB", {
      get: F.prototype.NB,
      set: F.prototype.QB,
    });
    F.prototype.get_collideConnected = F.prototype.OB = function () {
      return !!Km(this.EB);
    };
    F.prototype.set_collideConnected = F.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Lm(c, b);
    };
    Object.defineProperty(F.prototype, "collideConnected", {
      get: F.prototype.OB,
      set: F.prototype.RB,
    });
    F.prototype.__destroy__ = F.prototype.HB = function () {
      Mm(this.EB);
    };
    function RE() {
      throw "cannot construct a b2GearJoint, no constructor in IDL";
    }
    RE.prototype = Object.create(m.prototype);
    RE.prototype.constructor = RE;
    RE.prototype.FB = RE;
    RE.GB = {};
    a.b2GearJoint = RE;
    RE.prototype.GetJoint1 = function () {
      return h(Nm(this.EB), m);
    };
    RE.prototype.GetJoint2 = function () {
      return h(Om(this.EB), m);
    };
    RE.prototype.SetRatio = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pm(c, b);
    };
    RE.prototype.GetRatio = function () {
      return Qm(this.EB);
    };
    RE.prototype.GetType = function () {
      return Rm(this.EB);
    };
    RE.prototype.GetBodyA = function () {
      return h(Sm(this.EB), l);
    };
    RE.prototype.GetBodyB = function () {
      return h(Tm(this.EB), l);
    };
    RE.prototype.GetAnchorA = function () {
      return h(Um(this.EB), n);
    };
    RE.prototype.GetAnchorB = function () {
      return h(Vm(this.EB), n);
    };
    RE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Wm(c, b), n);
    };
    RE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Xm(c, b);
    };
    RE.prototype.GetNext = function () {
      return h(Ym(this.EB), m);
    };
    RE.prototype.GetUserData = function () {
      return h(Zm(this.EB), lE);
    };
    RE.prototype.GetCollideConnected = function () {
      return !!$m(this.EB);
    };
    RE.prototype.__destroy__ = RE.prototype.HB = function () {
      an(this.EB);
    };
    function G() {
      this.EB = bn();
      g(G)[this.EB] = this;
    }
    G.prototype = Object.create(k.prototype);
    G.prototype.constructor = G;
    G.prototype.FB = G;
    G.GB = {};
    a.b2GearJointDef = G;
    G.prototype.get_joint1 = G.prototype.HE = function () {
      return h(cn(this.EB), m);
    };
    G.prototype.set_joint1 = G.prototype.dH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dn(c, b);
    };
    Object.defineProperty(G.prototype, "joint1", {
      get: G.prototype.HE,
      set: G.prototype.dH,
    });
    G.prototype.get_joint2 = G.prototype.IE = function () {
      return h(en(this.EB), m);
    };
    G.prototype.set_joint2 = G.prototype.eH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fn(c, b);
    };
    Object.defineProperty(G.prototype, "joint2", {
      get: G.prototype.IE,
      set: G.prototype.eH,
    });
    G.prototype.get_ratio = G.prototype.gD = function () {
      return gn(this.EB);
    };
    G.prototype.set_ratio = G.prototype.MD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hn(c, b);
    };
    Object.defineProperty(G.prototype, "ratio", {
      get: G.prototype.gD,
      set: G.prototype.MD,
    });
    G.prototype.get_type = G.prototype.KB = function () {
      return jn(this.EB);
    };
    G.prototype.set_type = G.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kn(c, b);
    };
    Object.defineProperty(G.prototype, "type", {
      get: G.prototype.KB,
      set: G.prototype.LB,
    });
    G.prototype.get_userData = G.prototype.IB = function () {
      return h(ln(this.EB), lE);
    };
    G.prototype.set_userData = G.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mn(c, b);
    };
    Object.defineProperty(G.prototype, "userData", {
      get: G.prototype.IB,
      set: G.prototype.JB,
    });
    G.prototype.get_bodyA = G.prototype.MB = function () {
      return h(nn(this.EB), l);
    };
    G.prototype.set_bodyA = G.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      on(c, b);
    };
    Object.defineProperty(G.prototype, "bodyA", {
      get: G.prototype.MB,
      set: G.prototype.PB,
    });
    G.prototype.get_bodyB = G.prototype.NB = function () {
      return h(pn(this.EB), l);
    };
    G.prototype.set_bodyB = G.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qn(c, b);
    };
    Object.defineProperty(G.prototype, "bodyB", {
      get: G.prototype.NB,
      set: G.prototype.QB,
    });
    G.prototype.get_collideConnected = G.prototype.OB = function () {
      return !!rn(this.EB);
    };
    G.prototype.set_collideConnected = G.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      sn(c, b);
    };
    Object.defineProperty(G.prototype, "collideConnected", {
      get: G.prototype.OB,
      set: G.prototype.RB,
    });
    G.prototype.__destroy__ = G.prototype.HB = function () {
      tn(this.EB);
    };
    function y() {
      this.EB = un();
      g(y)[this.EB] = this;
    }
    y.prototype = Object.create(f.prototype);
    y.prototype.constructor = y;
    y.prototype.FB = y;
    y.GB = {};
    a.b2JointEdge = y;
    y.prototype.get_other = y.prototype.cD = function () {
      return h(vn(this.EB), l);
    };
    y.prototype.set_other = y.prototype.ID = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wn(c, b);
    };
    Object.defineProperty(y.prototype, "other", {
      get: y.prototype.cD,
      set: y.prototype.ID,
    });
    y.prototype.get_joint = y.prototype.GE = function () {
      return h(xn(this.EB), m);
    };
    y.prototype.set_joint = y.prototype.cH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yn(c, b);
    };
    Object.defineProperty(y.prototype, "joint", {
      get: y.prototype.GE,
      set: y.prototype.cH,
    });
    y.prototype.get_prev = y.prototype.eD = function () {
      return h(zn(this.EB), y);
    };
    y.prototype.set_prev = y.prototype.KD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      An(c, b);
    };
    Object.defineProperty(y.prototype, "prev", {
      get: y.prototype.eD,
      set: y.prototype.KD,
    });
    y.prototype.get_next = y.prototype.bD = function () {
      return h(Bn(this.EB), y);
    };
    y.prototype.set_next = y.prototype.HD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Cn(c, b);
    };
    Object.defineProperty(y.prototype, "next", {
      get: y.prototype.bD,
      set: y.prototype.HD,
    });
    y.prototype.__destroy__ = y.prototype.HB = function () {
      Dn(this.EB);
    };
    function p() {
      this.EB = En();
      g(p)[this.EB] = this;
    }
    p.prototype = Object.create(f.prototype);
    p.prototype.constructor = p;
    p.prototype.FB = p;
    p.GB = {};
    a.b2Manifold = p;
    p.prototype.get_points = p.prototype.dD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Fn(c, b), H);
    };
    p.prototype.set_points = p.prototype.JD = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Gn(d, b, c);
    };
    Object.defineProperty(p.prototype, "points", {
      get: p.prototype.dD,
      set: p.prototype.JD,
    });
    p.prototype.get_localNormal = p.prototype.TE = function () {
      return h(Hn(this.EB), n);
    };
    p.prototype.set_localNormal = p.prototype.pH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      In(c, b);
    };
    Object.defineProperty(p.prototype, "localNormal", {
      get: p.prototype.TE,
      set: p.prototype.pH,
    });
    p.prototype.get_localPoint = p.prototype.VC = function () {
      return h(Jn(this.EB), n);
    };
    p.prototype.set_localPoint = p.prototype.AD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kn(c, b);
    };
    Object.defineProperty(p.prototype, "localPoint", {
      get: p.prototype.VC,
      set: p.prototype.AD,
    });
    p.prototype.get_type = p.prototype.KB = function () {
      return Ln(this.EB);
    };
    p.prototype.set_type = p.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Mn(c, b);
    };
    Object.defineProperty(p.prototype, "type", {
      get: p.prototype.KB,
      set: p.prototype.LB,
    });
    p.prototype.get_pointCount = p.prototype.vF = function () {
      return Nn(this.EB);
    };
    p.prototype.set_pointCount = p.prototype.SH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      On(c, b);
    };
    Object.defineProperty(p.prototype, "pointCount", {
      get: p.prototype.vF,
      set: p.prototype.SH,
    });
    p.prototype.__destroy__ = p.prototype.HB = function () {
      Pn(this.EB);
    };
    function SE() {
      this.EB = Qn();
      g(SE)[this.EB] = this;
    }
    SE.prototype = Object.create(f.prototype);
    SE.prototype.constructor = SE;
    SE.prototype.FB = SE;
    SE.GB = {};
    a.b2WorldManifold = SE;
    SE.prototype.Initialize = function (b, c, d, e, q) {
      var fa = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      q && "object" === typeof q && (q = q.EB);
      Rn(fa, b, c, d, e, q);
    };
    SE.prototype.get_normal = SE.prototype.nC = function () {
      return h(Sn(this.EB), n);
    };
    SE.prototype.set_normal = SE.prototype.zC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Tn(c, b);
    };
    Object.defineProperty(SE.prototype, "normal", {
      get: SE.prototype.nC,
      set: SE.prototype.zC,
    });
    SE.prototype.get_points = SE.prototype.dD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Un(c, b), n);
    };
    SE.prototype.set_points = SE.prototype.JD = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Vn(d, b, c);
    };
    Object.defineProperty(SE.prototype, "points", {
      get: SE.prototype.dD,
      set: SE.prototype.JD,
    });
    SE.prototype.get_separations = SE.prototype.EF = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Wn(c, b);
    };
    SE.prototype.set_separations = SE.prototype.aI = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Xn(d, b, c);
    };
    Object.defineProperty(SE.prototype, "separations", {
      get: SE.prototype.EF,
      set: SE.prototype.aI,
    });
    SE.prototype.__destroy__ = SE.prototype.HB = function () {
      Yn(this.EB);
    };
    function H() {
      this.EB = Zn();
      g(H)[this.EB] = this;
    }
    H.prototype = Object.create(f.prototype);
    H.prototype.constructor = H;
    H.prototype.FB = H;
    H.GB = {};
    a.b2ManifoldPoint = H;
    H.prototype.get_localPoint = H.prototype.VC = function () {
      return h($n(this.EB), n);
    };
    H.prototype.set_localPoint = H.prototype.AD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ao(c, b);
    };
    Object.defineProperty(H.prototype, "localPoint", {
      get: H.prototype.VC,
      set: H.prototype.AD,
    });
    H.prototype.get_normalImpulse = H.prototype.mF = function () {
      return bo(this.EB);
    };
    H.prototype.set_normalImpulse = H.prototype.JH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      co(c, b);
    };
    Object.defineProperty(H.prototype, "normalImpulse", {
      get: H.prototype.mF,
      set: H.prototype.JH,
    });
    H.prototype.get_tangentImpulse = H.prototype.YF = function () {
      return eo(this.EB);
    };
    H.prototype.set_tangentImpulse = H.prototype.uI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fo(c, b);
    };
    Object.defineProperty(H.prototype, "tangentImpulse", {
      get: H.prototype.YF,
      set: H.prototype.uI,
    });
    H.prototype.get_id = H.prototype.RC = function () {
      return h(go(this.EB), KE);
    };
    H.prototype.set_id = H.prototype.wD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ho(c, b);
    };
    Object.defineProperty(H.prototype, "id", {
      get: H.prototype.RC,
      set: H.prototype.wD,
    });
    H.prototype.__destroy__ = H.prototype.HB = function () {
      io(this.EB);
    };
    function TE(b, c, d, e) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      this.EB =
        void 0 === b
          ? jo()
          : void 0 === c
            ? _emscripten_bind_b2Mat22_b2Mat22_1(b)
            : void 0 === d
              ? ko(b, c)
              : void 0 === e
                ? _emscripten_bind_b2Mat22_b2Mat22_3(b, c, d)
                : lo(b, c, d, e);
      g(TE)[this.EB] = this;
    }
    TE.prototype = Object.create(f.prototype);
    TE.prototype.constructor = TE;
    TE.prototype.FB = TE;
    TE.GB = {};
    a.b2Mat22 = TE;
    TE.prototype.Set = TE.prototype.Set = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      mo(d, b, c);
    };
    TE.prototype.SetIdentity = function () {
      no(this.EB);
    };
    TE.prototype.SetZero = function () {
      oo(this.EB);
    };
    TE.prototype.GetInverse = function () {
      return h(po(this.EB), TE);
    };
    TE.prototype.Solve = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(qo(c, b), n);
    };
    TE.prototype.get_ex = TE.prototype.MC = function () {
      return h(ro(this.EB), n);
    };
    TE.prototype.set_ex = TE.prototype.rD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      so(c, b);
    };
    Object.defineProperty(TE.prototype, "ex", {
      get: TE.prototype.MC,
      set: TE.prototype.rD,
    });
    TE.prototype.get_ey = TE.prototype.NC = function () {
      return h(to(this.EB), n);
    };
    TE.prototype.set_ey = TE.prototype.sD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      uo(c, b);
    };
    Object.defineProperty(TE.prototype, "ey", {
      get: TE.prototype.NC,
      set: TE.prototype.sD,
    });
    TE.prototype.__destroy__ = TE.prototype.HB = function () {
      vo(this.EB);
    };
    function UE(b, c, d) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      this.EB =
        void 0 === b
          ? wo()
          : void 0 === c
            ? _emscripten_bind_b2Mat33_b2Mat33_1(b)
            : void 0 === d
              ? _emscripten_bind_b2Mat33_b2Mat33_2(b, c)
              : xo(b, c, d);
      g(UE)[this.EB] = this;
    }
    UE.prototype = Object.create(f.prototype);
    UE.prototype.constructor = UE;
    UE.prototype.FB = UE;
    UE.GB = {};
    a.b2Mat33 = UE;
    UE.prototype.SetZero = function () {
      yo(this.EB);
    };
    UE.prototype.Solve33 = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(zo(c, b), x);
    };
    UE.prototype.Solve22 = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Ao(c, b), n);
    };
    UE.prototype.GetInverse22 = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bo(c, b);
    };
    UE.prototype.GetSymInverse33 = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Co(c, b);
    };
    UE.prototype.get_ex = UE.prototype.MC = function () {
      return h(Do(this.EB), x);
    };
    UE.prototype.set_ex = UE.prototype.rD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Eo(c, b);
    };
    Object.defineProperty(UE.prototype, "ex", {
      get: UE.prototype.MC,
      set: UE.prototype.rD,
    });
    UE.prototype.get_ey = UE.prototype.NC = function () {
      return h(Fo(this.EB), x);
    };
    UE.prototype.set_ey = UE.prototype.sD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Go(c, b);
    };
    Object.defineProperty(UE.prototype, "ey", {
      get: UE.prototype.NC,
      set: UE.prototype.sD,
    });
    UE.prototype.get_ez = UE.prototype.qE = function () {
      return h(Ho(this.EB), x);
    };
    UE.prototype.set_ez = UE.prototype.MG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Io(c, b);
    };
    Object.defineProperty(UE.prototype, "ez", {
      get: UE.prototype.qE,
      set: UE.prototype.MG,
    });
    UE.prototype.__destroy__ = UE.prototype.HB = function () {
      Jo(this.EB);
    };
    function VE() {
      throw "cannot construct a b2MouseJoint, no constructor in IDL";
    }
    VE.prototype = Object.create(m.prototype);
    VE.prototype.constructor = VE;
    VE.prototype.FB = VE;
    VE.GB = {};
    a.b2MouseJoint = VE;
    VE.prototype.SetTarget = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ko(c, b);
    };
    VE.prototype.GetTarget = function () {
      return h(Lo(this.EB), n);
    };
    VE.prototype.SetMaxForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Mo(c, b);
    };
    VE.prototype.GetMaxForce = function () {
      return No(this.EB);
    };
    VE.prototype.SetStiffness = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Oo(c, b);
    };
    VE.prototype.GetStiffness = function () {
      return Po(this.EB);
    };
    VE.prototype.SetDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qo(c, b);
    };
    VE.prototype.GetDamping = function () {
      return Ro(this.EB);
    };
    VE.prototype.GetType = function () {
      return So(this.EB);
    };
    VE.prototype.GetBodyA = function () {
      return h(To(this.EB), l);
    };
    VE.prototype.GetBodyB = function () {
      return h(Uo(this.EB), l);
    };
    VE.prototype.GetAnchorA = function () {
      return h(Vo(this.EB), n);
    };
    VE.prototype.GetAnchorB = function () {
      return h(Wo(this.EB), n);
    };
    VE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Xo(c, b), n);
    };
    VE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Yo(c, b);
    };
    VE.prototype.GetNext = function () {
      return h(Zo(this.EB), m);
    };
    VE.prototype.GetUserData = function () {
      return h($o(this.EB), lE);
    };
    VE.prototype.GetCollideConnected = function () {
      return !!ap(this.EB);
    };
    VE.prototype.__destroy__ = VE.prototype.HB = function () {
      bp(this.EB);
    };
    function I() {
      this.EB = cp();
      g(I)[this.EB] = this;
    }
    I.prototype = Object.create(k.prototype);
    I.prototype.constructor = I;
    I.prototype.FB = I;
    I.GB = {};
    a.b2MouseJointDef = I;
    I.prototype.get_target = I.prototype.$F = function () {
      return h(dp(this.EB), n);
    };
    I.prototype.set_target = I.prototype.wI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ep(c, b);
    };
    Object.defineProperty(I.prototype, "target", {
      get: I.prototype.$F,
      set: I.prototype.wI,
    });
    I.prototype.get_maxForce = I.prototype.lC = function () {
      return fp(this.EB);
    };
    I.prototype.set_maxForce = I.prototype.xC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gp(c, b);
    };
    Object.defineProperty(I.prototype, "maxForce", {
      get: I.prototype.lC,
      set: I.prototype.xC,
    });
    I.prototype.get_stiffness = I.prototype.dC = function () {
      return hp(this.EB);
    };
    I.prototype.set_stiffness = I.prototype.gC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ip(c, b);
    };
    Object.defineProperty(I.prototype, "stiffness", {
      get: I.prototype.dC,
      set: I.prototype.gC,
    });
    I.prototype.get_damping = I.prototype.WB = function () {
      return jp(this.EB);
    };
    I.prototype.set_damping = I.prototype.ZB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kp(c, b);
    };
    Object.defineProperty(I.prototype, "damping", {
      get: I.prototype.WB,
      set: I.prototype.ZB,
    });
    I.prototype.get_type = I.prototype.KB = function () {
      return lp(this.EB);
    };
    I.prototype.set_type = I.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mp(c, b);
    };
    Object.defineProperty(I.prototype, "type", {
      get: I.prototype.KB,
      set: I.prototype.LB,
    });
    I.prototype.get_userData = I.prototype.IB = function () {
      return h(np(this.EB), lE);
    };
    I.prototype.set_userData = I.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      op(c, b);
    };
    Object.defineProperty(I.prototype, "userData", {
      get: I.prototype.IB,
      set: I.prototype.JB,
    });
    I.prototype.get_bodyA = I.prototype.MB = function () {
      return h(pp(this.EB), l);
    };
    I.prototype.set_bodyA = I.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qp(c, b);
    };
    Object.defineProperty(I.prototype, "bodyA", {
      get: I.prototype.MB,
      set: I.prototype.PB,
    });
    I.prototype.get_bodyB = I.prototype.NB = function () {
      return h(rp(this.EB), l);
    };
    I.prototype.set_bodyB = I.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      sp(c, b);
    };
    Object.defineProperty(I.prototype, "bodyB", {
      get: I.prototype.NB,
      set: I.prototype.QB,
    });
    I.prototype.get_collideConnected = I.prototype.OB = function () {
      return !!tp(this.EB);
    };
    I.prototype.set_collideConnected = I.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      up(c, b);
    };
    Object.defineProperty(I.prototype, "collideConnected", {
      get: I.prototype.OB,
      set: I.prototype.RB,
    });
    I.prototype.__destroy__ = I.prototype.HB = function () {
      vp(this.EB);
    };
    function J() {
      this.EB = wp();
      g(J)[this.EB] = this;
    }
    J.prototype = Object.create(iE.prototype);
    J.prototype.constructor = J;
    J.prototype.FB = J;
    J.GB = {};
    a.b2PolygonShape = J;
    J.prototype.Set = J.prototype.Set = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      xp(d, b, c);
    };
    J.prototype.SetAsBox = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      void 0 === d
        ? yp(q, b, c)
        : void 0 === e
          ? _emscripten_bind_b2PolygonShape_SetAsBox_3(q, b, c, d)
          : zp(q, b, c, d, e);
    };
    J.prototype.GetType = function () {
      return Ap(this.EB);
    };
    J.prototype.GetChildCount = function () {
      return Bp(this.EB);
    };
    J.prototype.TestPoint = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return !!Cp(d, b, c);
    };
    J.prototype.RayCast = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      return !!Dp(q, b, c, d, e);
    };
    J.prototype.ComputeAABB = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Ep(e, b, c, d);
    };
    J.prototype.ComputeMass = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Fp(d, b, c);
    };
    J.prototype.get_m_centroid = J.prototype.WE = function () {
      return h(Gp(this.EB), n);
    };
    J.prototype.set_m_centroid = J.prototype.sH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hp(c, b);
    };
    Object.defineProperty(J.prototype, "m_centroid", {
      get: J.prototype.WE,
      set: J.prototype.sH,
    });
    J.prototype.get_m_vertices = J.prototype.YC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Ip(c, b), n);
    };
    J.prototype.set_m_vertices = J.prototype.DD = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Jp(d, b, c);
    };
    Object.defineProperty(J.prototype, "m_vertices", {
      get: J.prototype.YC,
      set: J.prototype.DD,
    });
    J.prototype.get_m_normals = J.prototype.YE = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Kp(c, b), n);
    };
    J.prototype.set_m_normals = J.prototype.uH = function (b, c) {
      var d = this.EB;
      gE();
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Lp(d, b, c);
    };
    Object.defineProperty(J.prototype, "m_normals", {
      get: J.prototype.YE,
      set: J.prototype.uH,
    });
    J.prototype.get_m_count = J.prototype.XC = function () {
      return Mp(this.EB);
    };
    J.prototype.set_m_count = J.prototype.CD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Np(c, b);
    };
    Object.defineProperty(J.prototype, "m_count", {
      get: J.prototype.XC,
      set: J.prototype.CD,
    });
    J.prototype.get_m_type = J.prototype.YB = function () {
      return Op(this.EB);
    };
    J.prototype.set_m_type = J.prototype.aC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pp(c, b);
    };
    Object.defineProperty(J.prototype, "m_type", {
      get: J.prototype.YB,
      set: J.prototype.aC,
    });
    J.prototype.get_m_radius = J.prototype.XB = function () {
      return Qp(this.EB);
    };
    J.prototype.set_m_radius = J.prototype.$B = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Rp(c, b);
    };
    Object.defineProperty(J.prototype, "m_radius", {
      get: J.prototype.XB,
      set: J.prototype.$B,
    });
    J.prototype.__destroy__ = J.prototype.HB = function () {
      Sp(this.EB);
    };
    function WE() {
      throw "cannot construct a b2PrismaticJoint, no constructor in IDL";
    }
    WE.prototype = Object.create(m.prototype);
    WE.prototype.constructor = WE;
    WE.prototype.FB = WE;
    WE.GB = {};
    a.b2PrismaticJoint = WE;
    WE.prototype.GetLocalAnchorA = function () {
      return h(Tp(this.EB), n);
    };
    WE.prototype.GetLocalAnchorB = function () {
      return h(Up(this.EB), n);
    };
    WE.prototype.GetLocalAxisA = function () {
      return h(Vp(this.EB), n);
    };
    WE.prototype.GetReferenceAngle = function () {
      return Wp(this.EB);
    };
    WE.prototype.GetJointTranslation = function () {
      return Xp(this.EB);
    };
    WE.prototype.GetJointSpeed = function () {
      return Yp(this.EB);
    };
    WE.prototype.IsLimitEnabled = function () {
      return !!Zp(this.EB);
    };
    WE.prototype.EnableLimit = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $p(c, b);
    };
    WE.prototype.GetLowerLimit = function () {
      return aq(this.EB);
    };
    WE.prototype.GetUpperLimit = function () {
      return bq(this.EB);
    };
    WE.prototype.SetLimits = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      cq(d, b, c);
    };
    WE.prototype.IsMotorEnabled = function () {
      return !!dq(this.EB);
    };
    WE.prototype.EnableMotor = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      eq(c, b);
    };
    WE.prototype.SetMotorSpeed = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fq(c, b);
    };
    WE.prototype.GetMotorSpeed = function () {
      return gq(this.EB);
    };
    WE.prototype.SetMaxMotorForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hq(c, b);
    };
    WE.prototype.GetMaxMotorForce = function () {
      return iq(this.EB);
    };
    WE.prototype.GetMotorForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return jq(c, b);
    };
    WE.prototype.GetType = function () {
      return kq(this.EB);
    };
    WE.prototype.GetBodyA = function () {
      return h(lq(this.EB), l);
    };
    WE.prototype.GetBodyB = function () {
      return h(mq(this.EB), l);
    };
    WE.prototype.GetAnchorA = function () {
      return h(nq(this.EB), n);
    };
    WE.prototype.GetAnchorB = function () {
      return h(oq(this.EB), n);
    };
    WE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(pq(c, b), n);
    };
    WE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return qq(c, b);
    };
    WE.prototype.GetNext = function () {
      return h(rq(this.EB), m);
    };
    WE.prototype.GetUserData = function () {
      return h(sq(this.EB), lE);
    };
    WE.prototype.GetCollideConnected = function () {
      return !!tq(this.EB);
    };
    WE.prototype.__destroy__ = WE.prototype.HB = function () {
      uq(this.EB);
    };
    function K() {
      this.EB = vq();
      g(K)[this.EB] = this;
    }
    K.prototype = Object.create(k.prototype);
    K.prototype.constructor = K;
    K.prototype.FB = K;
    K.GB = {};
    a.b2PrismaticJointDef = K;
    K.prototype.Initialize = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      wq(q, b, c, d, e);
    };
    K.prototype.get_localAnchorA = K.prototype.SB = function () {
      return h(xq(this.EB), n);
    };
    K.prototype.set_localAnchorA = K.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yq(c, b);
    };
    Object.defineProperty(K.prototype, "localAnchorA", {
      get: K.prototype.SB,
      set: K.prototype.UB,
    });
    K.prototype.get_localAnchorB = K.prototype.TB = function () {
      return h(zq(this.EB), n);
    };
    K.prototype.set_localAnchorB = K.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Aq(c, b);
    };
    Object.defineProperty(K.prototype, "localAnchorB", {
      get: K.prototype.TB,
      set: K.prototype.VB,
    });
    K.prototype.get_localAxisA = K.prototype.UC = function () {
      return h(Bq(this.EB), n);
    };
    K.prototype.set_localAxisA = K.prototype.zD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Cq(c, b);
    };
    Object.defineProperty(K.prototype, "localAxisA", {
      get: K.prototype.UC,
      set: K.prototype.zD,
    });
    K.prototype.get_referenceAngle = K.prototype.pC = function () {
      return Dq(this.EB);
    };
    K.prototype.set_referenceAngle = K.prototype.BC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Eq(c, b);
    };
    Object.defineProperty(K.prototype, "referenceAngle", {
      get: K.prototype.pC,
      set: K.prototype.BC,
    });
    K.prototype.get_enableLimit = K.prototype.hC = function () {
      return !!Fq(this.EB);
    };
    K.prototype.set_enableLimit = K.prototype.tC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Gq(c, b);
    };
    Object.defineProperty(K.prototype, "enableLimit", {
      get: K.prototype.hC,
      set: K.prototype.tC,
    });
    K.prototype.get_lowerTranslation = K.prototype.WC = function () {
      return Hq(this.EB);
    };
    K.prototype.set_lowerTranslation = K.prototype.BD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Iq(c, b);
    };
    Object.defineProperty(K.prototype, "lowerTranslation", {
      get: K.prototype.WC,
      set: K.prototype.BD,
    });
    K.prototype.get_upperTranslation = K.prototype.jD = function () {
      return Jq(this.EB);
    };
    K.prototype.set_upperTranslation = K.prototype.PD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kq(c, b);
    };
    Object.defineProperty(K.prototype, "upperTranslation", {
      get: K.prototype.jD,
      set: K.prototype.PD,
    });
    K.prototype.get_enableMotor = K.prototype.iC = function () {
      return !!Lq(this.EB);
    };
    K.prototype.set_enableMotor = K.prototype.uC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Mq(c, b);
    };
    Object.defineProperty(K.prototype, "enableMotor", {
      get: K.prototype.iC,
      set: K.prototype.uC,
    });
    K.prototype.get_maxMotorForce = K.prototype.kF = function () {
      return Nq(this.EB);
    };
    K.prototype.set_maxMotorForce = K.prototype.HH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Oq(c, b);
    };
    Object.defineProperty(K.prototype, "maxMotorForce", {
      get: K.prototype.kF,
      set: K.prototype.HH,
    });
    K.prototype.get_motorSpeed = K.prototype.mC = function () {
      return Pq(this.EB);
    };
    K.prototype.set_motorSpeed = K.prototype.yC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qq(c, b);
    };
    Object.defineProperty(K.prototype, "motorSpeed", {
      get: K.prototype.mC,
      set: K.prototype.yC,
    });
    K.prototype.get_type = K.prototype.KB = function () {
      return Rq(this.EB);
    };
    K.prototype.set_type = K.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Sq(c, b);
    };
    Object.defineProperty(K.prototype, "type", {
      get: K.prototype.KB,
      set: K.prototype.LB,
    });
    K.prototype.get_userData = K.prototype.IB = function () {
      return h(Tq(this.EB), lE);
    };
    K.prototype.set_userData = K.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Uq(c, b);
    };
    Object.defineProperty(K.prototype, "userData", {
      get: K.prototype.IB,
      set: K.prototype.JB,
    });
    K.prototype.get_bodyA = K.prototype.MB = function () {
      return h(Vq(this.EB), l);
    };
    K.prototype.set_bodyA = K.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Wq(c, b);
    };
    Object.defineProperty(K.prototype, "bodyA", {
      get: K.prototype.MB,
      set: K.prototype.PB,
    });
    K.prototype.get_bodyB = K.prototype.NB = function () {
      return h(Xq(this.EB), l);
    };
    K.prototype.set_bodyB = K.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Yq(c, b);
    };
    Object.defineProperty(K.prototype, "bodyB", {
      get: K.prototype.NB,
      set: K.prototype.QB,
    });
    K.prototype.get_collideConnected = K.prototype.OB = function () {
      return !!Zq(this.EB);
    };
    K.prototype.set_collideConnected = K.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $q(c, b);
    };
    Object.defineProperty(K.prototype, "collideConnected", {
      get: K.prototype.OB,
      set: K.prototype.RB,
    });
    K.prototype.__destroy__ = K.prototype.HB = function () {
      ar(this.EB);
    };
    function v() {
      throw "cannot construct a b2Profile, no constructor in IDL";
    }
    v.prototype = Object.create(f.prototype);
    v.prototype.constructor = v;
    v.prototype.FB = v;
    v.GB = {};
    a.b2Profile = v;
    v.prototype.get_step = v.prototype.PF = function () {
      return br(this.EB);
    };
    v.prototype.set_step = v.prototype.lI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cr(c, b);
    };
    Object.defineProperty(v.prototype, "step", {
      get: v.prototype.PF,
      set: v.prototype.lI,
    });
    v.prototype.get_collide = v.prototype.hE = function () {
      return dr(this.EB);
    };
    v.prototype.set_collide = v.prototype.DG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      er(c, b);
    };
    Object.defineProperty(v.prototype, "collide", {
      get: v.prototype.hE,
      set: v.prototype.DG,
    });
    v.prototype.get_solve = v.prototype.GF = function () {
      return fr(this.EB);
    };
    v.prototype.set_solve = v.prototype.cI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gr(c, b);
    };
    Object.defineProperty(v.prototype, "solve", {
      get: v.prototype.GF,
      set: v.prototype.cI,
    });
    v.prototype.get_solveInit = v.prototype.HF = function () {
      return hr(this.EB);
    };
    v.prototype.set_solveInit = v.prototype.dI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ir(c, b);
    };
    Object.defineProperty(v.prototype, "solveInit", {
      get: v.prototype.HF,
      set: v.prototype.dI,
    });
    v.prototype.get_solveVelocity = v.prototype.KF = function () {
      return jr(this.EB);
    };
    v.prototype.set_solveVelocity = v.prototype.gI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kr(c, b);
    };
    Object.defineProperty(v.prototype, "solveVelocity", {
      get: v.prototype.KF,
      set: v.prototype.gI,
    });
    v.prototype.get_solvePosition = v.prototype.IF = function () {
      return lr(this.EB);
    };
    v.prototype.set_solvePosition = v.prototype.eI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mr(c, b);
    };
    Object.defineProperty(v.prototype, "solvePosition", {
      get: v.prototype.IF,
      set: v.prototype.eI,
    });
    v.prototype.get_broadphase = v.prototype.bE = function () {
      return nr(this.EB);
    };
    v.prototype.set_broadphase = v.prototype.xG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      or(c, b);
    };
    Object.defineProperty(v.prototype, "broadphase", {
      get: v.prototype.bE,
      set: v.prototype.xG,
    });
    v.prototype.get_solveTOI = v.prototype.JF = function () {
      return pr(this.EB);
    };
    v.prototype.set_solveTOI = v.prototype.fI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qr(c, b);
    };
    Object.defineProperty(v.prototype, "solveTOI", {
      get: v.prototype.JF,
      set: v.prototype.fI,
    });
    v.prototype.__destroy__ = v.prototype.HB = function () {
      rr(this.EB);
    };
    function XE() {
      throw "cannot construct a b2PulleyJoint, no constructor in IDL";
    }
    XE.prototype = Object.create(m.prototype);
    XE.prototype.constructor = XE;
    XE.prototype.FB = XE;
    XE.GB = {};
    a.b2PulleyJoint = XE;
    XE.prototype.GetGroundAnchorA = function () {
      return h(sr(this.EB), n);
    };
    XE.prototype.GetGroundAnchorB = function () {
      return h(tr(this.EB), n);
    };
    XE.prototype.GetLengthA = function () {
      return ur(this.EB);
    };
    XE.prototype.GetLengthB = function () {
      return vr(this.EB);
    };
    XE.prototype.GetRatio = function () {
      return wr(this.EB);
    };
    XE.prototype.GetCurrentLengthA = function () {
      return xr(this.EB);
    };
    XE.prototype.GetCurrentLengthB = function () {
      return yr(this.EB);
    };
    XE.prototype.GetType = function () {
      return zr(this.EB);
    };
    XE.prototype.GetBodyA = function () {
      return h(Ar(this.EB), l);
    };
    XE.prototype.GetBodyB = function () {
      return h(Br(this.EB), l);
    };
    XE.prototype.GetAnchorA = function () {
      return h(Cr(this.EB), n);
    };
    XE.prototype.GetAnchorB = function () {
      return h(Dr(this.EB), n);
    };
    XE.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Er(c, b), n);
    };
    XE.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Fr(c, b);
    };
    XE.prototype.GetNext = function () {
      return h(Gr(this.EB), m);
    };
    XE.prototype.GetUserData = function () {
      return h(Hr(this.EB), lE);
    };
    XE.prototype.GetCollideConnected = function () {
      return !!Ir(this.EB);
    };
    XE.prototype.__destroy__ = XE.prototype.HB = function () {
      Jr(this.EB);
    };
    function L() {
      this.EB = Kr();
      g(L)[this.EB] = this;
    }
    L.prototype = Object.create(k.prototype);
    L.prototype.constructor = L;
    L.prototype.FB = L;
    L.GB = {};
    a.b2PulleyJointDef = L;
    L.prototype.Initialize = function (b, c, d, e, q, fa, nb) {
      var Eb = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      q && "object" === typeof q && (q = q.EB);
      fa && "object" === typeof fa && (fa = fa.EB);
      nb && "object" === typeof nb && (nb = nb.EB);
      Lr(Eb, b, c, d, e, q, fa, nb);
    };
    L.prototype.get_groundAnchorA = L.prototype.yE = function () {
      return h(Mr(this.EB), n);
    };
    L.prototype.set_groundAnchorA = L.prototype.VG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nr(c, b);
    };
    Object.defineProperty(L.prototype, "groundAnchorA", {
      get: L.prototype.yE,
      set: L.prototype.VG,
    });
    L.prototype.get_groundAnchorB = L.prototype.zE = function () {
      return h(Or(this.EB), n);
    };
    L.prototype.set_groundAnchorB = L.prototype.WG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pr(c, b);
    };
    Object.defineProperty(L.prototype, "groundAnchorB", {
      get: L.prototype.zE,
      set: L.prototype.WG,
    });
    L.prototype.get_localAnchorA = L.prototype.SB = function () {
      return h(Qr(this.EB), n);
    };
    L.prototype.set_localAnchorA = L.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Rr(c, b);
    };
    Object.defineProperty(L.prototype, "localAnchorA", {
      get: L.prototype.SB,
      set: L.prototype.UB,
    });
    L.prototype.get_localAnchorB = L.prototype.TB = function () {
      return h(Sr(this.EB), n);
    };
    L.prototype.set_localAnchorB = L.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Tr(c, b);
    };
    Object.defineProperty(L.prototype, "localAnchorB", {
      get: L.prototype.TB,
      set: L.prototype.VB,
    });
    L.prototype.get_lengthA = L.prototype.OE = function () {
      return Ur(this.EB);
    };
    L.prototype.set_lengthA = L.prototype.kH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vr(c, b);
    };
    Object.defineProperty(L.prototype, "lengthA", {
      get: L.prototype.OE,
      set: L.prototype.kH,
    });
    L.prototype.get_lengthB = L.prototype.PE = function () {
      return Wr(this.EB);
    };
    L.prototype.set_lengthB = L.prototype.lH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Xr(c, b);
    };
    Object.defineProperty(L.prototype, "lengthB", {
      get: L.prototype.PE,
      set: L.prototype.lH,
    });
    L.prototype.get_ratio = L.prototype.gD = function () {
      return Yr(this.EB);
    };
    L.prototype.set_ratio = L.prototype.MD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Zr(c, b);
    };
    Object.defineProperty(L.prototype, "ratio", {
      get: L.prototype.gD,
      set: L.prototype.MD,
    });
    L.prototype.get_type = L.prototype.KB = function () {
      return $r(this.EB);
    };
    L.prototype.set_type = L.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      as(c, b);
    };
    Object.defineProperty(L.prototype, "type", {
      get: L.prototype.KB,
      set: L.prototype.LB,
    });
    L.prototype.get_userData = L.prototype.IB = function () {
      return h(bs(this.EB), lE);
    };
    L.prototype.set_userData = L.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cs(c, b);
    };
    Object.defineProperty(L.prototype, "userData", {
      get: L.prototype.IB,
      set: L.prototype.JB,
    });
    L.prototype.get_bodyA = L.prototype.MB = function () {
      return h(ds(this.EB), l);
    };
    L.prototype.set_bodyA = L.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      es(c, b);
    };
    Object.defineProperty(L.prototype, "bodyA", {
      get: L.prototype.MB,
      set: L.prototype.PB,
    });
    L.prototype.get_bodyB = L.prototype.NB = function () {
      return h(gs(this.EB), l);
    };
    L.prototype.set_bodyB = L.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hs(c, b);
    };
    Object.defineProperty(L.prototype, "bodyB", {
      get: L.prototype.NB,
      set: L.prototype.QB,
    });
    L.prototype.get_collideConnected = L.prototype.OB = function () {
      return !!is(this.EB);
    };
    L.prototype.set_collideConnected = L.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      js(c, b);
    };
    Object.defineProperty(L.prototype, "collideConnected", {
      get: L.prototype.OB,
      set: L.prototype.RB,
    });
    L.prototype.__destroy__ = L.prototype.HB = function () {
      ks(this.EB);
    };
    function YE() {
      throw "cannot construct a b2RayCastInput, no constructor in IDL";
    }
    YE.prototype = Object.create(f.prototype);
    YE.prototype.constructor = YE;
    YE.prototype.FB = YE;
    YE.GB = {};
    a.b2RayCastInput = YE;
    YE.prototype.get_p1 = YE.prototype.pF = function () {
      return h(ls(this.EB), n);
    };
    YE.prototype.set_p1 = YE.prototype.MH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ms(c, b);
    };
    Object.defineProperty(YE.prototype, "p1", {
      get: YE.prototype.pF,
      set: YE.prototype.MH,
    });
    YE.prototype.get_p2 = YE.prototype.qF = function () {
      return h(ns(this.EB), n);
    };
    YE.prototype.set_p2 = YE.prototype.NH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ps(c, b);
    };
    Object.defineProperty(YE.prototype, "p2", {
      get: YE.prototype.qF,
      set: YE.prototype.NH,
    });
    YE.prototype.get_maxFraction = YE.prototype.iF = function () {
      return qs(this.EB);
    };
    YE.prototype.set_maxFraction = YE.prototype.FH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rs(c, b);
    };
    Object.defineProperty(YE.prototype, "maxFraction", {
      get: YE.prototype.iF,
      set: YE.prototype.FH,
    });
    YE.prototype.__destroy__ = YE.prototype.HB = function () {
      ss(this.EB);
    };
    function ZE() {
      throw "cannot construct a b2RayCastOutput, no constructor in IDL";
    }
    ZE.prototype = Object.create(f.prototype);
    ZE.prototype.constructor = ZE;
    ZE.prototype.FB = ZE;
    ZE.GB = {};
    a.b2RayCastOutput = ZE;
    ZE.prototype.get_normal = ZE.prototype.nC = function () {
      return h(ts(this.EB), n);
    };
    ZE.prototype.set_normal = ZE.prototype.zC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      us(c, b);
    };
    Object.defineProperty(ZE.prototype, "normal", {
      get: ZE.prototype.nC,
      set: ZE.prototype.zC,
    });
    ZE.prototype.get_fraction = ZE.prototype.vE = function () {
      return vs(this.EB);
    };
    ZE.prototype.set_fraction = ZE.prototype.SG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xs(c, b);
    };
    Object.defineProperty(ZE.prototype, "fraction", {
      get: ZE.prototype.vE,
      set: ZE.prototype.SG,
    });
    ZE.prototype.__destroy__ = ZE.prototype.HB = function () {
      ys(this.EB);
    };
    function $E() {
      throw "cannot construct a b2RevoluteJoint, no constructor in IDL";
    }
    $E.prototype = Object.create(m.prototype);
    $E.prototype.constructor = $E;
    $E.prototype.FB = $E;
    $E.GB = {};
    a.b2RevoluteJoint = $E;
    $E.prototype.GetLocalAnchorA = function () {
      return h(zs(this.EB), n);
    };
    $E.prototype.GetLocalAnchorB = function () {
      return h(As(this.EB), n);
    };
    $E.prototype.GetReferenceAngle = function () {
      return Bs(this.EB);
    };
    $E.prototype.GetJointAngle = function () {
      return Cs(this.EB);
    };
    $E.prototype.GetJointSpeed = function () {
      return Ds(this.EB);
    };
    $E.prototype.IsLimitEnabled = function () {
      return !!Es(this.EB);
    };
    $E.prototype.EnableLimit = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fs(c, b);
    };
    $E.prototype.GetLowerLimit = function () {
      return Gs(this.EB);
    };
    $E.prototype.GetUpperLimit = function () {
      return Hs(this.EB);
    };
    $E.prototype.SetLimits = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Is(d, b, c);
    };
    $E.prototype.IsMotorEnabled = function () {
      return !!Js(this.EB);
    };
    $E.prototype.EnableMotor = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ks(c, b);
    };
    $E.prototype.SetMotorSpeed = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ls(c, b);
    };
    $E.prototype.GetMotorSpeed = function () {
      return Ms(this.EB);
    };
    $E.prototype.SetMaxMotorTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ns(c, b);
    };
    $E.prototype.GetMaxMotorTorque = function () {
      return Os(this.EB);
    };
    $E.prototype.GetMotorTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Ps(c, b);
    };
    $E.prototype.GetType = function () {
      return Qs(this.EB);
    };
    $E.prototype.GetBodyA = function () {
      return h(Rs(this.EB), l);
    };
    $E.prototype.GetBodyB = function () {
      return h(Ss(this.EB), l);
    };
    $E.prototype.GetAnchorA = function () {
      return h(Ts(this.EB), n);
    };
    $E.prototype.GetAnchorB = function () {
      return h(Us(this.EB), n);
    };
    $E.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Vs(c, b), n);
    };
    $E.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return Ws(c, b);
    };
    $E.prototype.GetNext = function () {
      return h(Xs(this.EB), m);
    };
    $E.prototype.GetUserData = function () {
      return h(Ys(this.EB), lE);
    };
    $E.prototype.GetCollideConnected = function () {
      return !!Zs(this.EB);
    };
    $E.prototype.__destroy__ = $E.prototype.HB = function () {
      $s(this.EB);
    };
    function M() {
      this.EB = at();
      g(M)[this.EB] = this;
    }
    M.prototype = Object.create(k.prototype);
    M.prototype.constructor = M;
    M.prototype.FB = M;
    M.GB = {};
    a.b2RevoluteJointDef = M;
    M.prototype.Initialize = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      bt(e, b, c, d);
    };
    M.prototype.get_localAnchorA = M.prototype.SB = function () {
      return h(ct(this.EB), n);
    };
    M.prototype.set_localAnchorA = M.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dt(c, b);
    };
    Object.defineProperty(M.prototype, "localAnchorA", {
      get: M.prototype.SB,
      set: M.prototype.UB,
    });
    M.prototype.get_localAnchorB = M.prototype.TB = function () {
      return h(et(this.EB), n);
    };
    M.prototype.set_localAnchorB = M.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ft(c, b);
    };
    Object.defineProperty(M.prototype, "localAnchorB", {
      get: M.prototype.TB,
      set: M.prototype.VB,
    });
    M.prototype.get_referenceAngle = M.prototype.pC = function () {
      return gt(this.EB);
    };
    M.prototype.set_referenceAngle = M.prototype.BC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ht(c, b);
    };
    Object.defineProperty(M.prototype, "referenceAngle", {
      get: M.prototype.pC,
      set: M.prototype.BC,
    });
    M.prototype.get_enableLimit = M.prototype.hC = function () {
      return !!it(this.EB);
    };
    M.prototype.set_enableLimit = M.prototype.tC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jt(c, b);
    };
    Object.defineProperty(M.prototype, "enableLimit", {
      get: M.prototype.hC,
      set: M.prototype.tC,
    });
    M.prototype.get_lowerAngle = M.prototype.UE = function () {
      return kt(this.EB);
    };
    M.prototype.set_lowerAngle = M.prototype.qH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lt(c, b);
    };
    Object.defineProperty(M.prototype, "lowerAngle", {
      get: M.prototype.UE,
      set: M.prototype.qH,
    });
    M.prototype.get_upperAngle = M.prototype.dG = function () {
      return mt(this.EB);
    };
    M.prototype.set_upperAngle = M.prototype.AI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      nt(c, b);
    };
    Object.defineProperty(M.prototype, "upperAngle", {
      get: M.prototype.dG,
      set: M.prototype.AI,
    });
    M.prototype.get_enableMotor = M.prototype.iC = function () {
      return !!ot(this.EB);
    };
    M.prototype.set_enableMotor = M.prototype.uC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pt(c, b);
    };
    Object.defineProperty(M.prototype, "enableMotor", {
      get: M.prototype.iC,
      set: M.prototype.uC,
    });
    M.prototype.get_motorSpeed = M.prototype.mC = function () {
      return qt(this.EB);
    };
    M.prototype.set_motorSpeed = M.prototype.yC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rt(c, b);
    };
    Object.defineProperty(M.prototype, "motorSpeed", {
      get: M.prototype.mC,
      set: M.prototype.yC,
    });
    M.prototype.get_maxMotorTorque = M.prototype.$C = function () {
      return st(this.EB);
    };
    M.prototype.set_maxMotorTorque = M.prototype.FD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      tt(c, b);
    };
    Object.defineProperty(M.prototype, "maxMotorTorque", {
      get: M.prototype.$C,
      set: M.prototype.FD,
    });
    M.prototype.get_type = M.prototype.KB = function () {
      return ut(this.EB);
    };
    M.prototype.set_type = M.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vt(c, b);
    };
    Object.defineProperty(M.prototype, "type", {
      get: M.prototype.KB,
      set: M.prototype.LB,
    });
    M.prototype.get_userData = M.prototype.IB = function () {
      return h(wt(this.EB), lE);
    };
    M.prototype.set_userData = M.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xt(c, b);
    };
    Object.defineProperty(M.prototype, "userData", {
      get: M.prototype.IB,
      set: M.prototype.JB,
    });
    M.prototype.get_bodyA = M.prototype.MB = function () {
      return h(yt(this.EB), l);
    };
    M.prototype.set_bodyA = M.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zt(c, b);
    };
    Object.defineProperty(M.prototype, "bodyA", {
      get: M.prototype.MB,
      set: M.prototype.PB,
    });
    M.prototype.get_bodyB = M.prototype.NB = function () {
      return h(At(this.EB), l);
    };
    M.prototype.set_bodyB = M.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bt(c, b);
    };
    Object.defineProperty(M.prototype, "bodyB", {
      get: M.prototype.NB,
      set: M.prototype.QB,
    });
    M.prototype.get_collideConnected = M.prototype.OB = function () {
      return !!Ct(this.EB);
    };
    M.prototype.set_collideConnected = M.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Dt(c, b);
    };
    Object.defineProperty(M.prototype, "collideConnected", {
      get: M.prototype.OB,
      set: M.prototype.RB,
    });
    M.prototype.__destroy__ = M.prototype.HB = function () {
      Et(this.EB);
    };
    function yE(b) {
      b && "object" === typeof b && (b = b.EB);
      this.EB = void 0 === b ? Ft() : Gt(b);
      g(yE)[this.EB] = this;
    }
    yE.prototype = Object.create(f.prototype);
    yE.prototype.constructor = yE;
    yE.prototype.FB = yE;
    yE.GB = {};
    a.b2Rot = yE;
    yE.prototype.Set = yE.prototype.Set = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ht(c, b);
    };
    yE.prototype.SetIdentity = function () {
      It(this.EB);
    };
    yE.prototype.GetAngle = function () {
      return Jt(this.EB);
    };
    yE.prototype.GetXAxis = function () {
      return h(Kt(this.EB), n);
    };
    yE.prototype.GetYAxis = function () {
      return h(Lt(this.EB), n);
    };
    yE.prototype.get_s = yE.prototype.hD = function () {
      return Mt(this.EB);
    };
    yE.prototype.set_s = yE.prototype.ND = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nt(c, b);
    };
    Object.defineProperty(yE.prototype, "s", {
      get: yE.prototype.hD,
      set: yE.prototype.ND,
    });
    yE.prototype.get_c = yE.prototype.dE = function () {
      return Ot(this.EB);
    };
    yE.prototype.set_c = yE.prototype.zG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pt(c, b);
    };
    Object.defineProperty(yE.prototype, "c", {
      get: yE.prototype.dE,
      set: yE.prototype.zG,
    });
    yE.prototype.__destroy__ = yE.prototype.HB = function () {
      Qt(this.EB);
    };
    function N() {
      throw "cannot construct a b2WheelJoint, no constructor in IDL";
    }
    N.prototype = Object.create(m.prototype);
    N.prototype.constructor = N;
    N.prototype.FB = N;
    N.GB = {};
    a.b2WheelJoint = N;
    N.prototype.GetLocalAnchorA = function () {
      return h(Rt(this.EB), n);
    };
    N.prototype.GetLocalAnchorB = function () {
      return h(St(this.EB), n);
    };
    N.prototype.GetLocalAxisA = function () {
      return h(Tt(this.EB), n);
    };
    N.prototype.GetJointTranslation = function () {
      return Ut(this.EB);
    };
    N.prototype.GetJointLinearSpeed = function () {
      return Vt(this.EB);
    };
    N.prototype.GetJointAngle = function () {
      return Wt(this.EB);
    };
    N.prototype.GetJointAngularSpeed = function () {
      return Xt(this.EB);
    };
    N.prototype.IsLimitEnabled = function () {
      return !!Yt(this.EB);
    };
    N.prototype.EnableLimit = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Zt(c, b);
    };
    N.prototype.GetLowerLimit = function () {
      return $t(this.EB);
    };
    N.prototype.GetUpperLimit = function () {
      return au(this.EB);
    };
    N.prototype.SetLimits = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      bu(d, b, c);
    };
    N.prototype.IsMotorEnabled = function () {
      return !!cu(this.EB);
    };
    N.prototype.EnableMotor = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      du(c, b);
    };
    N.prototype.SetMotorSpeed = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      eu(c, b);
    };
    N.prototype.GetMotorSpeed = function () {
      return fu(this.EB);
    };
    N.prototype.SetMaxMotorTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gu(c, b);
    };
    N.prototype.GetMaxMotorTorque = function () {
      return hu(this.EB);
    };
    N.prototype.GetMotorTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return iu(c, b);
    };
    N.prototype.SetStiffness = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ju(c, b);
    };
    N.prototype.GetStiffness = function () {
      return ku(this.EB);
    };
    N.prototype.SetDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lu(c, b);
    };
    N.prototype.GetDamping = function () {
      return mu(this.EB);
    };
    N.prototype.GetType = function () {
      return nu(this.EB);
    };
    N.prototype.GetBodyA = function () {
      return h(ou(this.EB), l);
    };
    N.prototype.GetBodyB = function () {
      return h(pu(this.EB), l);
    };
    N.prototype.GetAnchorA = function () {
      return h(qu(this.EB), n);
    };
    N.prototype.GetAnchorB = function () {
      return h(ru(this.EB), n);
    };
    N.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(su(c, b), n);
    };
    N.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return tu(c, b);
    };
    N.prototype.GetNext = function () {
      return h(uu(this.EB), m);
    };
    N.prototype.GetUserData = function () {
      return h(vu(this.EB), lE);
    };
    N.prototype.GetCollideConnected = function () {
      return !!wu(this.EB);
    };
    N.prototype.__destroy__ = N.prototype.HB = function () {
      xu(this.EB);
    };
    function O() {
      this.EB = yu();
      g(O)[this.EB] = this;
    }
    O.prototype = Object.create(k.prototype);
    O.prototype.constructor = O;
    O.prototype.FB = O;
    O.GB = {};
    a.b2WheelJointDef = O;
    O.prototype.Initialize = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      zu(q, b, c, d, e);
    };
    O.prototype.get_localAnchorA = O.prototype.SB = function () {
      return h(Au(this.EB), n);
    };
    O.prototype.set_localAnchorA = O.prototype.UB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bu(c, b);
    };
    Object.defineProperty(O.prototype, "localAnchorA", {
      get: O.prototype.SB,
      set: O.prototype.UB,
    });
    O.prototype.get_localAnchorB = O.prototype.TB = function () {
      return h(Cu(this.EB), n);
    };
    O.prototype.set_localAnchorB = O.prototype.VB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Du(c, b);
    };
    Object.defineProperty(O.prototype, "localAnchorB", {
      get: O.prototype.TB,
      set: O.prototype.VB,
    });
    O.prototype.get_localAxisA = O.prototype.UC = function () {
      return h(Eu(this.EB), n);
    };
    O.prototype.set_localAxisA = O.prototype.zD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fu(c, b);
    };
    Object.defineProperty(O.prototype, "localAxisA", {
      get: O.prototype.UC,
      set: O.prototype.zD,
    });
    O.prototype.get_enableLimit = O.prototype.hC = function () {
      return !!Gu(this.EB);
    };
    O.prototype.set_enableLimit = O.prototype.tC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hu(c, b);
    };
    Object.defineProperty(O.prototype, "enableLimit", {
      get: O.prototype.hC,
      set: O.prototype.tC,
    });
    O.prototype.get_lowerTranslation = O.prototype.WC = function () {
      return Iu(this.EB);
    };
    O.prototype.set_lowerTranslation = O.prototype.BD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ju(c, b);
    };
    Object.defineProperty(O.prototype, "lowerTranslation", {
      get: O.prototype.WC,
      set: O.prototype.BD,
    });
    O.prototype.get_upperTranslation = O.prototype.jD = function () {
      return Ku(this.EB);
    };
    O.prototype.set_upperTranslation = O.prototype.PD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Lu(c, b);
    };
    Object.defineProperty(O.prototype, "upperTranslation", {
      get: O.prototype.jD,
      set: O.prototype.PD,
    });
    O.prototype.get_enableMotor = O.prototype.iC = function () {
      return !!Mu(this.EB);
    };
    O.prototype.set_enableMotor = O.prototype.uC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nu(c, b);
    };
    Object.defineProperty(O.prototype, "enableMotor", {
      get: O.prototype.iC,
      set: O.prototype.uC,
    });
    O.prototype.get_maxMotorTorque = O.prototype.$C = function () {
      return Ou(this.EB);
    };
    O.prototype.set_maxMotorTorque = O.prototype.FD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pu(c, b);
    };
    Object.defineProperty(O.prototype, "maxMotorTorque", {
      get: O.prototype.$C,
      set: O.prototype.FD,
    });
    O.prototype.get_motorSpeed = O.prototype.mC = function () {
      return Qu(this.EB);
    };
    O.prototype.set_motorSpeed = O.prototype.yC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ru(c, b);
    };
    Object.defineProperty(O.prototype, "motorSpeed", {
      get: O.prototype.mC,
      set: O.prototype.yC,
    });
    O.prototype.get_stiffness = O.prototype.dC = function () {
      return Su(this.EB);
    };
    O.prototype.set_stiffness = O.prototype.gC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Tu(c, b);
    };
    Object.defineProperty(O.prototype, "stiffness", {
      get: O.prototype.dC,
      set: O.prototype.gC,
    });
    O.prototype.get_damping = O.prototype.WB = function () {
      return Uu(this.EB);
    };
    O.prototype.set_damping = O.prototype.ZB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vu(c, b);
    };
    Object.defineProperty(O.prototype, "damping", {
      get: O.prototype.WB,
      set: O.prototype.ZB,
    });
    O.prototype.get_type = O.prototype.KB = function () {
      return Wu(this.EB);
    };
    O.prototype.set_type = O.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Xu(c, b);
    };
    Object.defineProperty(O.prototype, "type", {
      get: O.prototype.KB,
      set: O.prototype.LB,
    });
    O.prototype.get_userData = O.prototype.IB = function () {
      return h(Yu(this.EB), lE);
    };
    O.prototype.set_userData = O.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Zu(c, b);
    };
    Object.defineProperty(O.prototype, "userData", {
      get: O.prototype.IB,
      set: O.prototype.JB,
    });
    O.prototype.get_bodyA = O.prototype.MB = function () {
      return h($u(this.EB), l);
    };
    O.prototype.set_bodyA = O.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      av(c, b);
    };
    Object.defineProperty(O.prototype, "bodyA", {
      get: O.prototype.MB,
      set: O.prototype.PB,
    });
    O.prototype.get_bodyB = O.prototype.NB = function () {
      return h(bv(this.EB), l);
    };
    O.prototype.set_bodyB = O.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cv(c, b);
    };
    Object.defineProperty(O.prototype, "bodyB", {
      get: O.prototype.NB,
      set: O.prototype.QB,
    });
    O.prototype.get_collideConnected = O.prototype.OB = function () {
      return !!dv(this.EB);
    };
    O.prototype.set_collideConnected = O.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ev(c, b);
    };
    Object.defineProperty(O.prototype, "collideConnected", {
      get: O.prototype.OB,
      set: O.prototype.RB,
    });
    O.prototype.__destroy__ = O.prototype.HB = function () {
      fv(this.EB);
    };
    function aF() {
      throw "cannot construct a b2MotorJoint, no constructor in IDL";
    }
    aF.prototype = Object.create(m.prototype);
    aF.prototype.constructor = aF;
    aF.prototype.FB = aF;
    aF.GB = {};
    a.b2MotorJoint = aF;
    aF.prototype.SetLinearOffset = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gv(c, b);
    };
    aF.prototype.GetLinearOffset = function () {
      return h(hv(this.EB), n);
    };
    aF.prototype.SetAngularOffset = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      iv(c, b);
    };
    aF.prototype.GetAngularOffset = function () {
      return jv(this.EB);
    };
    aF.prototype.SetMaxForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kv(c, b);
    };
    aF.prototype.GetMaxForce = function () {
      return lv(this.EB);
    };
    aF.prototype.SetMaxTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mv(c, b);
    };
    aF.prototype.GetMaxTorque = function () {
      return nv(this.EB);
    };
    aF.prototype.SetCorrectionFactor = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ov(c, b);
    };
    aF.prototype.GetCorrectionFactor = function () {
      return pv(this.EB);
    };
    aF.prototype.GetType = function () {
      return qv(this.EB);
    };
    aF.prototype.GetBodyA = function () {
      return h(rv(this.EB), l);
    };
    aF.prototype.GetBodyB = function () {
      return h(sv(this.EB), l);
    };
    aF.prototype.GetAnchorA = function () {
      return h(tv(this.EB), n);
    };
    aF.prototype.GetAnchorB = function () {
      return h(uv(this.EB), n);
    };
    aF.prototype.GetReactionForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(vv(c, b), n);
    };
    aF.prototype.GetReactionTorque = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return wv(c, b);
    };
    aF.prototype.GetNext = function () {
      return h(xv(this.EB), m);
    };
    aF.prototype.GetUserData = function () {
      return h(yv(this.EB), lE);
    };
    aF.prototype.GetCollideConnected = function () {
      return !!zv(this.EB);
    };
    aF.prototype.__destroy__ = aF.prototype.HB = function () {
      Av(this.EB);
    };
    function P() {
      this.EB = Bv();
      g(P)[this.EB] = this;
    }
    P.prototype = Object.create(k.prototype);
    P.prototype.constructor = P;
    P.prototype.FB = P;
    P.GB = {};
    a.b2MotorJointDef = P;
    P.prototype.Initialize = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Cv(d, b, c);
    };
    P.prototype.get_linearOffset = P.prototype.SE = function () {
      return h(Dv(this.EB), n);
    };
    P.prototype.set_linearOffset = P.prototype.oH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ev(c, b);
    };
    Object.defineProperty(P.prototype, "linearOffset", {
      get: P.prototype.SE,
      set: P.prototype.oH,
    });
    P.prototype.get_angularOffset = P.prototype.VD = function () {
      return Fv(this.EB);
    };
    P.prototype.set_angularOffset = P.prototype.qG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Gv(c, b);
    };
    Object.defineProperty(P.prototype, "angularOffset", {
      get: P.prototype.VD,
      set: P.prototype.qG,
    });
    P.prototype.get_maxForce = P.prototype.lC = function () {
      return Hv(this.EB);
    };
    P.prototype.set_maxForce = P.prototype.xC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Iv(c, b);
    };
    Object.defineProperty(P.prototype, "maxForce", {
      get: P.prototype.lC,
      set: P.prototype.xC,
    });
    P.prototype.get_maxTorque = P.prototype.aD = function () {
      return Jv(this.EB);
    };
    P.prototype.set_maxTorque = P.prototype.GD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kv(c, b);
    };
    Object.defineProperty(P.prototype, "maxTorque", {
      get: P.prototype.aD,
      set: P.prototype.GD,
    });
    P.prototype.get_correctionFactor = P.prototype.kE = function () {
      return Lv(this.EB);
    };
    P.prototype.set_correctionFactor = P.prototype.GG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Mv(c, b);
    };
    Object.defineProperty(P.prototype, "correctionFactor", {
      get: P.prototype.kE,
      set: P.prototype.GG,
    });
    P.prototype.get_type = P.prototype.KB = function () {
      return Nv(this.EB);
    };
    P.prototype.set_type = P.prototype.LB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ov(c, b);
    };
    Object.defineProperty(P.prototype, "type", {
      get: P.prototype.KB,
      set: P.prototype.LB,
    });
    P.prototype.get_userData = P.prototype.IB = function () {
      return h(Pv(this.EB), lE);
    };
    P.prototype.set_userData = P.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qv(c, b);
    };
    Object.defineProperty(P.prototype, "userData", {
      get: P.prototype.IB,
      set: P.prototype.JB,
    });
    P.prototype.get_bodyA = P.prototype.MB = function () {
      return h(Rv(this.EB), l);
    };
    P.prototype.set_bodyA = P.prototype.PB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Sv(c, b);
    };
    Object.defineProperty(P.prototype, "bodyA", {
      get: P.prototype.MB,
      set: P.prototype.PB,
    });
    P.prototype.get_bodyB = P.prototype.NB = function () {
      return h(Tv(this.EB), l);
    };
    P.prototype.set_bodyB = P.prototype.QB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Uv(c, b);
    };
    Object.defineProperty(P.prototype, "bodyB", {
      get: P.prototype.NB,
      set: P.prototype.QB,
    });
    P.prototype.get_collideConnected = P.prototype.OB = function () {
      return !!Vv(this.EB);
    };
    P.prototype.set_collideConnected = P.prototype.RB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Wv(c, b);
    };
    Object.defineProperty(P.prototype, "collideConnected", {
      get: P.prototype.OB,
      set: P.prototype.RB,
    });
    P.prototype.__destroy__ = P.prototype.HB = function () {
      Xv(this.EB);
    };
    function Q() {
      this.EB = Yv();
      g(Q)[this.EB] = this;
    }
    Q.prototype = Object.create(f.prototype);
    Q.prototype.constructor = Q;
    Q.prototype.FB = Q;
    Q.GB = {};
    a.b2RopeTuning = Q;
    Q.prototype.get_stretchingModel = Q.prototype.TF = function () {
      return Zv(this.EB);
    };
    Q.prototype.set_stretchingModel = Q.prototype.pI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $v(c, b);
    };
    Object.defineProperty(Q.prototype, "stretchingModel", {
      get: Q.prototype.TF,
      set: Q.prototype.pI,
    });
    Q.prototype.get_bendingModel = Q.prototype.$D = function () {
      return aw(this.EB);
    };
    Q.prototype.set_bendingModel = Q.prototype.vG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      bw(c, b);
    };
    Object.defineProperty(Q.prototype, "bendingModel", {
      get: Q.prototype.$D,
      set: Q.prototype.vG,
    });
    Q.prototype.get_damping = Q.prototype.WB = function () {
      return cw(this.EB);
    };
    Q.prototype.set_damping = Q.prototype.ZB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dw(c, b);
    };
    Object.defineProperty(Q.prototype, "damping", {
      get: Q.prototype.WB,
      set: Q.prototype.ZB,
    });
    Q.prototype.get_stretchStiffness = Q.prototype.SF = function () {
      return ew(this.EB);
    };
    Q.prototype.set_stretchStiffness = Q.prototype.oI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fw(c, b);
    };
    Object.defineProperty(Q.prototype, "stretchStiffness", {
      get: Q.prototype.SF,
      set: Q.prototype.oI,
    });
    Q.prototype.get_stretchHertz = Q.prototype.RF = function () {
      return gw(this.EB);
    };
    Q.prototype.set_stretchHertz = Q.prototype.nI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hw(c, b);
    };
    Object.defineProperty(Q.prototype, "stretchHertz", {
      get: Q.prototype.RF,
      set: Q.prototype.nI,
    });
    Q.prototype.get_stretchDamping = Q.prototype.QF = function () {
      return iw(this.EB);
    };
    Q.prototype.set_stretchDamping = Q.prototype.mI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jw(c, b);
    };
    Object.defineProperty(Q.prototype, "stretchDamping", {
      get: Q.prototype.QF,
      set: Q.prototype.mI,
    });
    Q.prototype.get_bendStiffness = Q.prototype.ZD = function () {
      return kw(this.EB);
    };
    Q.prototype.set_bendStiffness = Q.prototype.uG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lw(c, b);
    };
    Object.defineProperty(Q.prototype, "bendStiffness", {
      get: Q.prototype.ZD,
      set: Q.prototype.uG,
    });
    Q.prototype.get_bendHertz = Q.prototype.YD = function () {
      return mw(this.EB);
    };
    Q.prototype.set_bendHertz = Q.prototype.tG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      nw(c, b);
    };
    Object.defineProperty(Q.prototype, "bendHertz", {
      get: Q.prototype.YD,
      set: Q.prototype.tG,
    });
    Q.prototype.get_bendDamping = Q.prototype.XD = function () {
      return ow(this.EB);
    };
    Q.prototype.set_bendDamping = Q.prototype.sG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pw(c, b);
    };
    Object.defineProperty(Q.prototype, "bendDamping", {
      get: Q.prototype.XD,
      set: Q.prototype.sG,
    });
    Q.prototype.get_isometric = Q.prototype.FE = function () {
      return !!qw(this.EB);
    };
    Q.prototype.set_isometric = Q.prototype.bH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rw(c, b);
    };
    Object.defineProperty(Q.prototype, "isometric", {
      get: Q.prototype.FE,
      set: Q.prototype.bH,
    });
    Q.prototype.get_fixedEffectiveMass = Q.prototype.sE = function () {
      return !!sw(this.EB);
    };
    Q.prototype.set_fixedEffectiveMass = Q.prototype.OG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      tw(c, b);
    };
    Object.defineProperty(Q.prototype, "fixedEffectiveMass", {
      get: Q.prototype.sE,
      set: Q.prototype.OG,
    });
    Q.prototype.get_warmStart = Q.prototype.kG = function () {
      return !!uw(this.EB);
    };
    Q.prototype.set_warmStart = Q.prototype.HI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vw(c, b);
    };
    Object.defineProperty(Q.prototype, "warmStart", {
      get: Q.prototype.kG,
      set: Q.prototype.HI,
    });
    Q.prototype.__destroy__ = Q.prototype.HB = function () {
      ww(this.EB);
    };
    function R() {
      this.EB = xw();
      g(R)[this.EB] = this;
    }
    R.prototype = Object.create(f.prototype);
    R.prototype.constructor = R;
    R.prototype.FB = R;
    R.GB = {};
    a.b2RopeDef = R;
    R.prototype.get_position = R.prototype.cC = function () {
      return h(yw(this.EB), n);
    };
    R.prototype.set_position = R.prototype.fC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      zw(c, b);
    };
    Object.defineProperty(R.prototype, "position", {
      get: R.prototype.cC,
      set: R.prototype.fC,
    });
    R.prototype.get_vertices = R.prototype.hG = function () {
      return h(Aw(this.EB), n);
    };
    R.prototype.set_vertices = R.prototype.EI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bw(c, b);
    };
    Object.defineProperty(R.prototype, "vertices", {
      get: R.prototype.hG,
      set: R.prototype.EI,
    });
    R.prototype.get_count = R.prototype.KC = function () {
      return Cw(this.EB);
    };
    R.prototype.set_count = R.prototype.pD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Dw(c, b);
    };
    Object.defineProperty(R.prototype, "count", {
      get: R.prototype.KC,
      set: R.prototype.pD,
    });
    R.prototype.get_gravity = R.prototype.xE = function () {
      return h(Ew(this.EB), n);
    };
    R.prototype.set_gravity = R.prototype.UG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fw(c, b);
    };
    Object.defineProperty(R.prototype, "gravity", {
      get: R.prototype.xE,
      set: R.prototype.UG,
    });
    R.prototype.get_tuning = R.prototype.aG = function () {
      return h(Gw(this.EB), Q);
    };
    R.prototype.set_tuning = R.prototype.xI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hw(c, b);
    };
    Object.defineProperty(R.prototype, "tuning", {
      get: R.prototype.aG,
      set: R.prototype.xI,
    });
    R.prototype.__destroy__ = R.prototype.HB = function () {
      Iw(this.EB);
    };
    function bF() {
      this.EB = Jw();
      g(bF)[this.EB] = this;
    }
    bF.prototype = Object.create(f.prototype);
    bF.prototype.constructor = bF;
    bF.prototype.FB = bF;
    bF.GB = {};
    a.b2Rope = bF;
    bF.prototype.Create = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kw(c, b);
    };
    bF.prototype.SetTuning = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Lw(c, b);
    };
    bF.prototype.Step = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      Mw(e, b, c, d);
    };
    bF.prototype.Reset = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nw(c, b);
    };
    bF.prototype.Draw = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ow(c, b);
    };
    bF.prototype.__destroy__ = bF.prototype.HB = function () {
      Pw(this.EB);
    };
    function cF() {
      this.EB = Qw();
      g(cF)[this.EB] = this;
    }
    cF.prototype = Object.create(f.prototype);
    cF.prototype.constructor = cF;
    cF.prototype.FB = cF;
    cF.GB = {};
    a.b2ClipVertex = cF;
    cF.prototype.get_v = cF.prototype.fG = function () {
      return h(Rw(this.EB), n);
    };
    cF.prototype.set_v = cF.prototype.CI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Sw(c, b);
    };
    Object.defineProperty(cF.prototype, "v", {
      get: cF.prototype.fG,
      set: cF.prototype.CI,
    });
    cF.prototype.get_id = cF.prototype.RC = function () {
      return h(Tw(this.EB), KE);
    };
    cF.prototype.set_id = cF.prototype.wD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Uw(c, b);
    };
    Object.defineProperty(cF.prototype, "id", {
      get: cF.prototype.RC,
      set: cF.prototype.wD,
    });
    cF.prototype.__destroy__ = cF.prototype.HB = function () {
      Vw(this.EB);
    };
    function S(b, c, d, e) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      this.EB =
        void 0 === b
          ? Ww()
          : void 0 === c
            ? Xw(b)
            : void 0 === d
              ? _emscripten_bind_b2ParticleColor_b2ParticleColor_2(b, c)
              : void 0 === e
                ? _emscripten_bind_b2ParticleColor_b2ParticleColor_3(b, c, d)
                : Yw(b, c, d, e);
      g(S)[this.EB] = this;
    }
    S.prototype = Object.create(f.prototype);
    S.prototype.constructor = S;
    S.prototype.FB = S;
    S.GB = {};
    a.b2ParticleColor = S;
    S.prototype.IsZero = function () {
      return !!Zw(this.EB);
    };
    S.prototype.GetColor = function () {
      return h($w(this.EB), GE);
    };
    S.prototype.Set = S.prototype.Set = function (b, c, d, e) {
      var q = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      e && "object" === typeof e && (e = e.EB);
      void 0 === c
        ? ax(q, b)
        : void 0 === d
          ? _emscripten_bind_b2ParticleColor_Set_2(q, b, c)
          : void 0 === e
            ? _emscripten_bind_b2ParticleColor_Set_3(q, b, c, d)
            : bx(q, b, c, d, e);
    };
    S.prototype.op_ass = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(cx(c, b), S);
    };
    S.prototype.op_mul_ass = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(dx(c, b), S);
    };
    S.prototype.op_add_ass = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(ex(c, b), S);
    };
    S.prototype.op_sub_ass = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(fx(c, b), S);
    };
    S.prototype.op_eq = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!gx(c, b);
    };
    S.prototype.Mix = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      hx(d, b, c);
    };
    S.prototype.MixColors = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      ix(e, b, c, d);
    };
    S.prototype.get_r = S.prototype.fD = function () {
      return jx(this.EB);
    };
    S.prototype.set_r = S.prototype.LD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kx(c, b);
    };
    Object.defineProperty(S.prototype, "r", {
      get: S.prototype.fD,
      set: S.prototype.LD,
    });
    S.prototype.get_g = S.prototype.OC = function () {
      return lx(this.EB);
    };
    S.prototype.set_g = S.prototype.tD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mx(c, b);
    };
    Object.defineProperty(S.prototype, "g", {
      get: S.prototype.OC,
      set: S.prototype.tD,
    });
    S.prototype.get_b = S.prototype.IC = function () {
      return nx(this.EB);
    };
    S.prototype.set_b = S.prototype.nD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ox(c, b);
    };
    Object.defineProperty(S.prototype, "b", {
      get: S.prototype.IC,
      set: S.prototype.nD,
    });
    S.prototype.get_a = S.prototype.SD = function () {
      return px(this.EB);
    };
    S.prototype.set_a = S.prototype.nG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qx(c, b);
    };
    Object.defineProperty(S.prototype, "a", {
      get: S.prototype.SD,
      set: S.prototype.nG,
    });
    S.prototype.__destroy__ = S.prototype.HB = function () {
      rx(this.EB);
    };
    function T() {
      this.EB = sx();
      g(T)[this.EB] = this;
    }
    T.prototype = Object.create(f.prototype);
    T.prototype.constructor = T;
    T.prototype.FB = T;
    T.GB = {};
    a.b2ParticleDef = T;
    T.prototype.get_flags = T.prototype.bC = function () {
      return tx(this.EB);
    };
    T.prototype.set_flags = T.prototype.eC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ux(c, b);
    };
    Object.defineProperty(T.prototype, "flags", {
      get: T.prototype.bC,
      set: T.prototype.eC,
    });
    T.prototype.get_position = T.prototype.cC = function () {
      return h(vx(this.EB), n);
    };
    T.prototype.set_position = T.prototype.fC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wx(c, b);
    };
    Object.defineProperty(T.prototype, "position", {
      get: T.prototype.cC,
      set: T.prototype.fC,
    });
    T.prototype.get_velocity = T.prototype.gG = function () {
      return h(xx(this.EB), n);
    };
    T.prototype.set_velocity = T.prototype.DI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yx(c, b);
    };
    Object.defineProperty(T.prototype, "velocity", {
      get: T.prototype.gG,
      set: T.prototype.DI,
    });
    T.prototype.get_color = T.prototype.JC = function () {
      return h(zx(this.EB), S);
    };
    T.prototype.set_color = T.prototype.oD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ax(c, b);
    };
    Object.defineProperty(T.prototype, "color", {
      get: T.prototype.JC,
      set: T.prototype.oD,
    });
    T.prototype.get_lifetime = T.prototype.SC = function () {
      return Bx(this.EB);
    };
    T.prototype.set_lifetime = T.prototype.xD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Cx(c, b);
    };
    Object.defineProperty(T.prototype, "lifetime", {
      get: T.prototype.SC,
      set: T.prototype.xD,
    });
    T.prototype.get_userData = T.prototype.IB = function () {
      return h(Dx(this.EB), pE);
    };
    T.prototype.set_userData = T.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ex(c, b);
    };
    Object.defineProperty(T.prototype, "userData", {
      get: T.prototype.IB,
      set: T.prototype.JB,
    });
    T.prototype.get_group = T.prototype.QC = function () {
      return h(Fx(this.EB), dF);
    };
    T.prototype.set_group = T.prototype.vD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Gx(c, b);
    };
    Object.defineProperty(T.prototype, "group", {
      get: T.prototype.QC,
      set: T.prototype.vD,
    });
    T.prototype.__destroy__ = T.prototype.HB = function () {
      Hx(this.EB);
    };
    function U() {
      this.EB = Ix();
      g(U)[this.EB] = this;
    }
    U.prototype = Object.create(f.prototype);
    U.prototype.constructor = U;
    U.prototype.FB = U;
    U.GB = {};
    a.b2ParticleGroupDef = U;
    U.prototype.get_flags = U.prototype.bC = function () {
      return Jx(this.EB);
    };
    U.prototype.set_flags = U.prototype.eC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Kx(c, b);
    };
    Object.defineProperty(U.prototype, "flags", {
      get: U.prototype.bC,
      set: U.prototype.eC,
    });
    U.prototype.get_groupFlags = U.prototype.AE = function () {
      return Lx(this.EB);
    };
    U.prototype.set_groupFlags = U.prototype.XG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Mx(c, b);
    };
    Object.defineProperty(U.prototype, "groupFlags", {
      get: U.prototype.AE,
      set: U.prototype.XG,
    });
    U.prototype.get_position = U.prototype.cC = function () {
      return h(Nx(this.EB), n);
    };
    U.prototype.set_position = U.prototype.fC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ox(c, b);
    };
    Object.defineProperty(U.prototype, "position", {
      get: U.prototype.cC,
      set: U.prototype.fC,
    });
    U.prototype.get_angle = U.prototype.GC = function () {
      return Px(this.EB);
    };
    U.prototype.set_angle = U.prototype.lD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qx(c, b);
    };
    Object.defineProperty(U.prototype, "angle", {
      get: U.prototype.GC,
      set: U.prototype.lD,
    });
    U.prototype.get_linearVelocity = U.prototype.TC = function () {
      return h(Rx(this.EB), n);
    };
    U.prototype.set_linearVelocity = U.prototype.yD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Sx(c, b);
    };
    Object.defineProperty(U.prototype, "linearVelocity", {
      get: U.prototype.TC,
      set: U.prototype.yD,
    });
    U.prototype.get_angularVelocity = U.prototype.HC = function () {
      return Tx(this.EB);
    };
    U.prototype.set_angularVelocity = U.prototype.mD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Ux(c, b);
    };
    Object.defineProperty(U.prototype, "angularVelocity", {
      get: U.prototype.HC,
      set: U.prototype.mD,
    });
    U.prototype.get_color = U.prototype.JC = function () {
      return h(Vx(this.EB), S);
    };
    U.prototype.set_color = U.prototype.oD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Wx(c, b);
    };
    Object.defineProperty(U.prototype, "color", {
      get: U.prototype.JC,
      set: U.prototype.oD,
    });
    U.prototype.get_strength = U.prototype.qC = function () {
      return Xx(this.EB);
    };
    U.prototype.set_strength = U.prototype.CC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Yx(c, b);
    };
    Object.defineProperty(U.prototype, "strength", {
      get: U.prototype.qC,
      set: U.prototype.CC,
    });
    U.prototype.get_shape = U.prototype.iD = function () {
      return h(Zx(this.EB), iE);
    };
    U.prototype.set_shape = U.prototype.OD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $x(c, b);
    };
    Object.defineProperty(U.prototype, "shape", {
      get: U.prototype.iD,
      set: U.prototype.OD,
    });
    U.prototype.get_shapeCount = U.prototype.FF = function () {
      return ay(this.EB);
    };
    U.prototype.set_shapeCount = U.prototype.bI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      by(c, b);
    };
    Object.defineProperty(U.prototype, "shapeCount", {
      get: U.prototype.FF,
      set: U.prototype.bI,
    });
    U.prototype.get_stride = U.prototype.VF = function () {
      return cy(this.EB);
    };
    U.prototype.set_stride = U.prototype.rI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dy(c, b);
    };
    Object.defineProperty(U.prototype, "stride", {
      get: U.prototype.VF,
      set: U.prototype.rI,
    });
    U.prototype.get_particleCount = U.prototype.sF = function () {
      return ey(this.EB);
    };
    U.prototype.set_particleCount = U.prototype.PH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fy(c, b);
    };
    Object.defineProperty(U.prototype, "particleCount", {
      get: U.prototype.sF,
      set: U.prototype.PH,
    });
    U.prototype.get_positionData = U.prototype.wF = function () {
      return h(gy(this.EB), n);
    };
    U.prototype.set_positionData = U.prototype.TH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hy(c, b);
    };
    Object.defineProperty(U.prototype, "positionData", {
      get: U.prototype.wF,
      set: U.prototype.TH,
    });
    U.prototype.get_lifetime = U.prototype.SC = function () {
      return iy(this.EB);
    };
    U.prototype.set_lifetime = U.prototype.xD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jy(c, b);
    };
    Object.defineProperty(U.prototype, "lifetime", {
      get: U.prototype.SC,
      set: U.prototype.xD,
    });
    U.prototype.get_userData = U.prototype.IB = function () {
      return h(ky(this.EB), pE);
    };
    U.prototype.set_userData = U.prototype.JB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ly(c, b);
    };
    Object.defineProperty(U.prototype, "userData", {
      get: U.prototype.IB,
      set: U.prototype.JB,
    });
    U.prototype.get_group = U.prototype.QC = function () {
      return h(my(this.EB), dF);
    };
    U.prototype.set_group = U.prototype.vD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ny(c, b);
    };
    Object.defineProperty(U.prototype, "group", {
      get: U.prototype.QC,
      set: U.prototype.vD,
    });
    U.prototype.__destroy__ = U.prototype.HB = function () {
      oy(this.EB);
    };
    function dF() {
      throw "cannot construct a b2ParticleGroup, no constructor in IDL";
    }
    dF.prototype = Object.create(f.prototype);
    dF.prototype.constructor = dF;
    dF.prototype.FB = dF;
    dF.GB = {};
    a.b2ParticleGroup = dF;
    dF.prototype.GetNext = function () {
      return h(py(this.EB), dF);
    };
    dF.prototype.GetParticleSystem = function () {
      return h(qy(this.EB), u);
    };
    dF.prototype.GetParticleCount = function () {
      return ry(this.EB);
    };
    dF.prototype.GetBufferIndex = function () {
      return sy(this.EB);
    };
    dF.prototype.ContainsParticle = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!ty(c, b);
    };
    dF.prototype.GetAllParticleFlags = function () {
      return uy(this.EB);
    };
    dF.prototype.GetGroupFlags = function () {
      return vy(this.EB);
    };
    dF.prototype.SetGroupFlags = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wy(c, b);
    };
    dF.prototype.GetMass = function () {
      return xy(this.EB);
    };
    dF.prototype.GetInertia = function () {
      return yy(this.EB);
    };
    dF.prototype.GetCenter = function () {
      return h(zy(this.EB), n);
    };
    dF.prototype.GetLinearVelocity = function () {
      return h(Ay(this.EB), n);
    };
    dF.prototype.GetAngularVelocity = function () {
      return By(this.EB);
    };
    dF.prototype.GetTransform = function () {
      return h(Cy(this.EB), xE);
    };
    dF.prototype.GetPosition = function () {
      return h(Dy(this.EB), n);
    };
    dF.prototype.GetAngle = function () {
      return Ey(this.EB);
    };
    dF.prototype.GetLinearVelocityFromWorldPoint = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(Fy(c, b), n);
    };
    dF.prototype.GetUserData = function () {
      return h(Gy(this.EB), pE);
    };
    dF.prototype.SetUserData = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hy(c, b);
    };
    dF.prototype.ApplyForce = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Iy(c, b);
    };
    dF.prototype.ApplyLinearImpulse = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jy(c, b);
    };
    dF.prototype.DestroyParticles = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      void 0 === b ? Ky(c) : Ly(c, b);
    };
    function eF() {
      this.EB = My();
      g(eF)[this.EB] = this;
    }
    eF.prototype = Object.create(f.prototype);
    eF.prototype.constructor = eF;
    eF.prototype.FB = eF;
    eF.GB = {};
    a.b2ParticleContact = eF;
    eF.prototype.SetIndices = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      Ny(d, b, c);
    };
    eF.prototype.SetWeight = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Oy(c, b);
    };
    eF.prototype.SetNormal = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Py(c, b);
    };
    eF.prototype.SetFlags = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Qy(c, b);
    };
    eF.prototype.GetIndexA = function () {
      return Ry(this.EB);
    };
    eF.prototype.GetIndexB = function () {
      return Sy(this.EB);
    };
    eF.prototype.GetWeight = function () {
      return Ty(this.EB);
    };
    eF.prototype.GetNormal = function () {
      return h(Uy(this.EB), n);
    };
    eF.prototype.GetFlags = function () {
      return Vy(this.EB);
    };
    eF.prototype.op_eq = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Wy(c, b);
    };
    eF.prototype.op_neq = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Xy(c, b);
    };
    eF.prototype.ApproximatelyEqual = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return !!Yy(c, b);
    };
    eF.prototype.__destroy__ = eF.prototype.HB = function () {
      Zy(this.EB);
    };
    function V() {
      this.EB = $y();
      g(V)[this.EB] = this;
    }
    V.prototype = Object.create(f.prototype);
    V.prototype.constructor = V;
    V.prototype.FB = V;
    V.GB = {};
    a.b2ParticleBodyContact = V;
    V.prototype.get_index = V.prototype.CE = function () {
      return az(this.EB);
    };
    V.prototype.set_index = V.prototype.ZG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      bz(c, b);
    };
    Object.defineProperty(V.prototype, "index", {
      get: V.prototype.CE,
      set: V.prototype.ZG,
    });
    V.prototype.get_body = V.prototype.aE = function () {
      return h(cz(this.EB), l);
    };
    V.prototype.set_body = V.prototype.wG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dz(c, b);
    };
    Object.defineProperty(V.prototype, "body", {
      get: V.prototype.aE,
      set: V.prototype.wG,
    });
    V.prototype.get_fixture = V.prototype.uE = function () {
      return h(ez(this.EB), r);
    };
    V.prototype.set_fixture = V.prototype.QG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      fz(c, b);
    };
    Object.defineProperty(V.prototype, "fixture", {
      get: V.prototype.uE,
      set: V.prototype.QG,
    });
    V.prototype.get_weight = V.prototype.lG = function () {
      return gz(this.EB);
    };
    V.prototype.set_weight = V.prototype.II = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      hz(c, b);
    };
    Object.defineProperty(V.prototype, "weight", {
      get: V.prototype.lG,
      set: V.prototype.II,
    });
    V.prototype.get_normal = V.prototype.nC = function () {
      return h(iz(this.EB), n);
    };
    V.prototype.set_normal = V.prototype.zC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      jz(c, b);
    };
    Object.defineProperty(V.prototype, "normal", {
      get: V.prototype.nC,
      set: V.prototype.zC,
    });
    V.prototype.get_mass = V.prototype.ZC = function () {
      return kz(this.EB);
    };
    V.prototype.set_mass = V.prototype.ED = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      lz(c, b);
    };
    Object.defineProperty(V.prototype, "mass", {
      get: V.prototype.ZC,
      set: V.prototype.ED,
    });
    V.prototype.__destroy__ = V.prototype.HB = function () {
      mz(this.EB);
    };
    function W() {
      this.EB = nz();
      g(W)[this.EB] = this;
    }
    W.prototype = Object.create(f.prototype);
    W.prototype.constructor = W;
    W.prototype.FB = W;
    W.GB = {};
    a.b2ParticlePair = W;
    W.prototype.get_indexA = W.prototype.jC = function () {
      return oz(this.EB);
    };
    W.prototype.set_indexA = W.prototype.vC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pz(c, b);
    };
    Object.defineProperty(W.prototype, "indexA", {
      get: W.prototype.jC,
      set: W.prototype.vC,
    });
    W.prototype.get_indexB = W.prototype.kC = function () {
      return qz(this.EB);
    };
    W.prototype.set_indexB = W.prototype.wC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      rz(c, b);
    };
    Object.defineProperty(W.prototype, "indexB", {
      get: W.prototype.kC,
      set: W.prototype.wC,
    });
    W.prototype.get_flags = W.prototype.bC = function () {
      return sz(this.EB);
    };
    W.prototype.set_flags = W.prototype.eC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      tz(c, b);
    };
    Object.defineProperty(W.prototype, "flags", {
      get: W.prototype.bC,
      set: W.prototype.eC,
    });
    W.prototype.get_strength = W.prototype.qC = function () {
      return uz(this.EB);
    };
    W.prototype.set_strength = W.prototype.CC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      vz(c, b);
    };
    Object.defineProperty(W.prototype, "strength", {
      get: W.prototype.qC,
      set: W.prototype.CC,
    });
    W.prototype.get_distance = W.prototype.nE = function () {
      return wz(this.EB);
    };
    W.prototype.set_distance = W.prototype.JG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      xz(c, b);
    };
    Object.defineProperty(W.prototype, "distance", {
      get: W.prototype.nE,
      set: W.prototype.JG,
    });
    W.prototype.__destroy__ = W.prototype.HB = function () {
      yz(this.EB);
    };
    function X() {
      this.EB = zz();
      g(X)[this.EB] = this;
    }
    X.prototype = Object.create(f.prototype);
    X.prototype.constructor = X;
    X.prototype.FB = X;
    X.GB = {};
    a.b2ParticleTriad = X;
    X.prototype.get_indexA = X.prototype.jC = function () {
      return Az(this.EB);
    };
    X.prototype.set_indexA = X.prototype.vC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Bz(c, b);
    };
    Object.defineProperty(X.prototype, "indexA", {
      get: X.prototype.jC,
      set: X.prototype.vC,
    });
    X.prototype.get_indexB = X.prototype.kC = function () {
      return Cz(this.EB);
    };
    X.prototype.set_indexB = X.prototype.wC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Dz(c, b);
    };
    Object.defineProperty(X.prototype, "indexB", {
      get: X.prototype.kC,
      set: X.prototype.wC,
    });
    X.prototype.get_indexC = X.prototype.DE = function () {
      return Ez(this.EB);
    };
    X.prototype.set_indexC = X.prototype.$G = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Fz(c, b);
    };
    Object.defineProperty(X.prototype, "indexC", {
      get: X.prototype.DE,
      set: X.prototype.$G,
    });
    X.prototype.get_flags = X.prototype.bC = function () {
      return Gz(this.EB);
    };
    X.prototype.set_flags = X.prototype.eC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Hz(c, b);
    };
    Object.defineProperty(X.prototype, "flags", {
      get: X.prototype.bC,
      set: X.prototype.eC,
    });
    X.prototype.get_strength = X.prototype.qC = function () {
      return Iz(this.EB);
    };
    X.prototype.set_strength = X.prototype.CC = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Jz(c, b);
    };
    Object.defineProperty(X.prototype, "strength", {
      get: X.prototype.qC,
      set: X.prototype.CC,
    });
    X.prototype.get_pa = X.prototype.rF = function () {
      return h(Kz(this.EB), n);
    };
    X.prototype.set_pa = X.prototype.OH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Lz(c, b);
    };
    Object.defineProperty(X.prototype, "pa", {
      get: X.prototype.rF,
      set: X.prototype.OH,
    });
    X.prototype.get_pb = X.prototype.tF = function () {
      return h(Mz(this.EB), n);
    };
    X.prototype.set_pb = X.prototype.QH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Nz(c, b);
    };
    Object.defineProperty(X.prototype, "pb", {
      get: X.prototype.tF,
      set: X.prototype.QH,
    });
    X.prototype.get_pc = X.prototype.uF = function () {
      return h(Oz(this.EB), n);
    };
    X.prototype.set_pc = X.prototype.RH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Pz(c, b);
    };
    Object.defineProperty(X.prototype, "pc", {
      get: X.prototype.uF,
      set: X.prototype.RH,
    });
    X.prototype.get_ka = X.prototype.JE = function () {
      return Qz(this.EB);
    };
    X.prototype.set_ka = X.prototype.fH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Rz(c, b);
    };
    Object.defineProperty(X.prototype, "ka", {
      get: X.prototype.JE,
      set: X.prototype.fH,
    });
    X.prototype.get_kb = X.prototype.KE = function () {
      return Sz(this.EB);
    };
    X.prototype.set_kb = X.prototype.gH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Tz(c, b);
    };
    Object.defineProperty(X.prototype, "kb", {
      get: X.prototype.KE,
      set: X.prototype.gH,
    });
    X.prototype.get_kc = X.prototype.LE = function () {
      return Uz(this.EB);
    };
    X.prototype.set_kc = X.prototype.hH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Vz(c, b);
    };
    Object.defineProperty(X.prototype, "kc", {
      get: X.prototype.LE,
      set: X.prototype.hH,
    });
    X.prototype.get_s = X.prototype.hD = function () {
      return Wz(this.EB);
    };
    X.prototype.set_s = X.prototype.ND = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      Xz(c, b);
    };
    Object.defineProperty(X.prototype, "s", {
      get: X.prototype.hD,
      set: X.prototype.ND,
    });
    X.prototype.__destroy__ = X.prototype.HB = function () {
      Yz(this.EB);
    };
    function Y() {
      this.EB = Zz();
      g(Y)[this.EB] = this;
    }
    Y.prototype = Object.create(f.prototype);
    Y.prototype.constructor = Y;
    Y.prototype.FB = Y;
    Y.GB = {};
    a.b2ParticleSystemDef = Y;
    Y.prototype.get_strictContactCheck = Y.prototype.UF = function () {
      return !!$z(this.EB);
    };
    Y.prototype.set_strictContactCheck = Y.prototype.qI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      aA(c, b);
    };
    Object.defineProperty(Y.prototype, "strictContactCheck", {
      get: Y.prototype.UF,
      set: Y.prototype.qI,
    });
    Y.prototype.get_density = Y.prototype.LC = function () {
      return bA(this.EB);
    };
    Y.prototype.set_density = Y.prototype.qD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cA(c, b);
    };
    Object.defineProperty(Y.prototype, "density", {
      get: Y.prototype.LC,
      set: Y.prototype.qD,
    });
    Y.prototype.get_gravityScale = Y.prototype.PC = function () {
      return dA(this.EB);
    };
    Y.prototype.set_gravityScale = Y.prototype.uD = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      eA(c, b);
    };
    Object.defineProperty(Y.prototype, "gravityScale", {
      get: Y.prototype.PC,
      set: Y.prototype.uD,
    });
    Y.prototype.get_radius = Y.prototype.AF = function () {
      return fA(this.EB);
    };
    Y.prototype.set_radius = Y.prototype.XH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gA(c, b);
    };
    Object.defineProperty(Y.prototype, "radius", {
      get: Y.prototype.AF,
      set: Y.prototype.XH,
    });
    Y.prototype.get_maxCount = Y.prototype.hF = function () {
      return hA(this.EB);
    };
    Y.prototype.set_maxCount = Y.prototype.EH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      iA(c, b);
    };
    Object.defineProperty(Y.prototype, "maxCount", {
      get: Y.prototype.hF,
      set: Y.prototype.EH,
    });
    Y.prototype.get_pressureStrength = Y.prototype.yF = function () {
      return jA(this.EB);
    };
    Y.prototype.set_pressureStrength = Y.prototype.VH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kA(c, b);
    };
    Object.defineProperty(Y.prototype, "pressureStrength", {
      get: Y.prototype.yF,
      set: Y.prototype.VH,
    });
    Y.prototype.get_dampingStrength = Y.prototype.lE = function () {
      return lA(this.EB);
    };
    Y.prototype.set_dampingStrength = Y.prototype.HG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mA(c, b);
    };
    Object.defineProperty(Y.prototype, "dampingStrength", {
      get: Y.prototype.lE,
      set: Y.prototype.HG,
    });
    Y.prototype.get_elasticStrength = Y.prototype.pE = function () {
      return nA(this.EB);
    };
    Y.prototype.set_elasticStrength = Y.prototype.LG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      oA(c, b);
    };
    Object.defineProperty(Y.prototype, "elasticStrength", {
      get: Y.prototype.pE,
      set: Y.prototype.LG,
    });
    Y.prototype.get_springStrength = Y.prototype.LF = function () {
      return pA(this.EB);
    };
    Y.prototype.set_springStrength = Y.prototype.hI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qA(c, b);
    };
    Object.defineProperty(Y.prototype, "springStrength", {
      get: Y.prototype.LF,
      set: Y.prototype.hI,
    });
    Y.prototype.get_viscousStrength = Y.prototype.iG = function () {
      return rA(this.EB);
    };
    Y.prototype.set_viscousStrength = Y.prototype.FI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      sA(c, b);
    };
    Object.defineProperty(Y.prototype, "viscousStrength", {
      get: Y.prototype.iG,
      set: Y.prototype.FI,
    });
    Y.prototype.get_surfaceTensionPressureStrength = Y.prototype.XF =
      function () {
        return tA(this.EB);
      };
    Y.prototype.set_surfaceTensionPressureStrength = Y.prototype.tI = function (
      b,
    ) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      uA(c, b);
    };
    Object.defineProperty(Y.prototype, "surfaceTensionPressureStrength", {
      get: Y.prototype.XF,
      set: Y.prototype.tI,
    });
    Y.prototype.get_surfaceTensionNormalStrength = Y.prototype.WF =
      function () {
        return vA(this.EB);
      };
    Y.prototype.set_surfaceTensionNormalStrength = Y.prototype.sI = function (
      b,
    ) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      wA(c, b);
    };
    Object.defineProperty(Y.prototype, "surfaceTensionNormalStrength", {
      get: Y.prototype.WF,
      set: Y.prototype.sI,
    });
    Y.prototype.get_repulsiveStrength = Y.prototype.BF = function () {
      return xA(this.EB);
    };
    Y.prototype.set_repulsiveStrength = Y.prototype.YH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      yA(c, b);
    };
    Object.defineProperty(Y.prototype, "repulsiveStrength", {
      get: Y.prototype.BF,
      set: Y.prototype.YH,
    });
    Y.prototype.get_powderStrength = Y.prototype.xF = function () {
      return zA(this.EB);
    };
    Y.prototype.set_powderStrength = Y.prototype.UH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      AA(c, b);
    };
    Object.defineProperty(Y.prototype, "powderStrength", {
      get: Y.prototype.xF,
      set: Y.prototype.UH,
    });
    Y.prototype.get_ejectionStrength = Y.prototype.oE = function () {
      return BA(this.EB);
    };
    Y.prototype.set_ejectionStrength = Y.prototype.KG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      CA(c, b);
    };
    Object.defineProperty(Y.prototype, "ejectionStrength", {
      get: Y.prototype.oE,
      set: Y.prototype.KG,
    });
    Y.prototype.get_staticPressureStrength = Y.prototype.OF = function () {
      return DA(this.EB);
    };
    Y.prototype.set_staticPressureStrength = Y.prototype.kI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      EA(c, b);
    };
    Object.defineProperty(Y.prototype, "staticPressureStrength", {
      get: Y.prototype.OF,
      set: Y.prototype.kI,
    });
    Y.prototype.get_staticPressureRelaxation = Y.prototype.NF = function () {
      return FA(this.EB);
    };
    Y.prototype.set_staticPressureRelaxation = Y.prototype.jI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      GA(c, b);
    };
    Object.defineProperty(Y.prototype, "staticPressureRelaxation", {
      get: Y.prototype.NF,
      set: Y.prototype.jI,
    });
    Y.prototype.get_staticPressureIterations = Y.prototype.MF = function () {
      return HA(this.EB);
    };
    Y.prototype.set_staticPressureIterations = Y.prototype.iI = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      IA(c, b);
    };
    Object.defineProperty(Y.prototype, "staticPressureIterations", {
      get: Y.prototype.MF,
      set: Y.prototype.iI,
    });
    Y.prototype.get_colorMixingStrength = Y.prototype.iE = function () {
      return JA(this.EB);
    };
    Y.prototype.set_colorMixingStrength = Y.prototype.EG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      KA(c, b);
    };
    Object.defineProperty(Y.prototype, "colorMixingStrength", {
      get: Y.prototype.iE,
      set: Y.prototype.EG,
    });
    Y.prototype.get_destroyByAge = Y.prototype.mE = function () {
      return !!LA(this.EB);
    };
    Y.prototype.set_destroyByAge = Y.prototype.IG = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      MA(c, b);
    };
    Object.defineProperty(Y.prototype, "destroyByAge", {
      get: Y.prototype.mE,
      set: Y.prototype.IG,
    });
    Y.prototype.get_lifetimeGranularity = Y.prototype.QE = function () {
      return NA(this.EB);
    };
    Y.prototype.set_lifetimeGranularity = Y.prototype.mH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      OA(c, b);
    };
    Object.defineProperty(Y.prototype, "lifetimeGranularity", {
      get: Y.prototype.QE,
      set: Y.prototype.mH,
    });
    Y.prototype.__destroy__ = Y.prototype.HB = function () {
      PA(this.EB);
    };
    function u() {
      throw "cannot construct a b2ParticleSystem, no constructor in IDL";
    }
    u.prototype = Object.create(f.prototype);
    u.prototype.constructor = u;
    u.prototype.FB = u;
    u.GB = {};
    a.b2ParticleSystem = u;
    u.prototype.CreateParticle = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return QA(c, b);
    };
    u.prototype.GetParticleHandleFromIndex = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(RA(c, b), fF);
    };
    u.prototype.DestroyParticle = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      void 0 === c ? SA(d, b) : TA(d, b, c);
    };
    u.prototype.DestroyOldestParticle = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      UA(d, b, c);
    };
    u.prototype.DestroyParticlesInShape = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      return void 0 === d ? VA(e, b, c) : WA(e, b, c, d);
    };
    u.prototype.CreateParticleGroup = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(XA(c, b), dF);
    };
    u.prototype.JoinParticleGroups = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      YA(d, b, c);
    };
    u.prototype.SplitParticleGroup = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      ZA(c, b);
    };
    u.prototype.GetParticleGroupList = function () {
      return h($A(this.EB), dF);
    };
    u.prototype.GetParticleGroupCount = function () {
      return aB(this.EB);
    };
    u.prototype.GetParticleCount = function () {
      return bB(this.EB);
    };
    u.prototype.GetMaxParticleCount = function () {
      return cB(this.EB);
    };
    u.prototype.SetMaxParticleCount = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dB(c, b);
    };
    u.prototype.GetAllParticleFlags = function () {
      return eB(this.EB);
    };
    u.prototype.GetAllGroupFlags = function () {
      return fB(this.EB);
    };
    u.prototype.SetPaused = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      gB(c, b);
    };
    u.prototype.GetPaused = function () {
      return !!hB(this.EB);
    };
    u.prototype.SetDensity = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      iB(c, b);
    };
    u.prototype.GetDensity = function () {
      return jB(this.EB);
    };
    u.prototype.SetGravityScale = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      kB(c, b);
    };
    u.prototype.GetGravityScale = function () {
      return lB(this.EB);
    };
    u.prototype.SetDamping = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      mB(c, b);
    };
    u.prototype.GetDamping = function () {
      return nB(this.EB);
    };
    u.prototype.SetStaticPressureIterations = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      oB(c, b);
    };
    u.prototype.GetStaticPressureIterations = function () {
      return pB(this.EB);
    };
    u.prototype.SetRadius = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      qB(c, b);
    };
    u.prototype.GetRadius = function () {
      return rB(this.EB);
    };
    u.prototype.GetPositionBuffer = function () {
      return h(sB(this.EB), n);
    };
    u.prototype.GetVelocityBuffer = function () {
      return h(tB(this.EB), n);
    };
    u.prototype.GetColorBuffer = function () {
      return h(uB(this.EB), S);
    };
    u.prototype.SetParticleFlags = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      vB(d, b, c);
    };
    u.prototype.GetParticleFlags = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return wB(c, b);
    };
    u.prototype.SetPositionBuffer = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      xB(d, b, c);
    };
    u.prototype.SetVelocityBuffer = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      yB(d, b, c);
    };
    u.prototype.SetColorBuffer = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      zB(d, b, c);
    };
    u.prototype.GetContacts = function () {
      return h(AB(this.EB), eF);
    };
    u.prototype.GetContactCount = function () {
      return BB(this.EB);
    };
    u.prototype.GetBodyContacts = function () {
      return h(CB(this.EB), V);
    };
    u.prototype.GetBodyContactCount = function () {
      return DB(this.EB);
    };
    u.prototype.GetPairs = function () {
      return h(EB(this.EB), W);
    };
    u.prototype.GetPairCount = function () {
      return FB(this.EB);
    };
    u.prototype.GetTriads = function () {
      return h(GB(this.EB), X);
    };
    u.prototype.GetTriadCount = function () {
      return HB(this.EB);
    };
    u.prototype.SetStuckThreshold = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      IB(c, b);
    };
    u.prototype.GetStuckCandidateCount = function () {
      return JB(this.EB);
    };
    u.prototype.ComputeCollisionEnergy = function () {
      return KB(this.EB);
    };
    u.prototype.SetStrictContactCheck = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      LB(c, b);
    };
    u.prototype.GetStrictContactCheck = function () {
      return !!MB(this.EB);
    };
    u.prototype.SetParticleLifetime = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      NB(d, b, c);
    };
    u.prototype.GetParticleLifetime = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return OB(c, b);
    };
    u.prototype.SetDestructionByAge = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      PB(c, b);
    };
    u.prototype.GetDestructionByAge = function () {
      return !!QB(this.EB);
    };
    u.prototype.ExpirationTimeToLifetime = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return RB(c, b);
    };
    u.prototype.ParticleApplyLinearImpulse = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      SB(d, b, c);
    };
    u.prototype.ApplyLinearImpulse = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      TB(e, b, c, d);
    };
    u.prototype.ParticleApplyForce = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      UB(d, b, c);
    };
    u.prototype.ApplyForce = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      VB(e, b, c, d);
    };
    u.prototype.GetNext = function () {
      return h(WB(this.EB), u);
    };
    u.prototype.QueryAABB = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      XB(d, b, c);
    };
    u.prototype.QueryShapeAABB = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      YB(e, b, c, d);
    };
    u.prototype.RayCast = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      ZB(e, b, c, d);
    };
    u.prototype.ComputeAABB = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      $B(c, b);
    };
    function fF() {
      this.EB = aC();
      g(fF)[this.EB] = this;
    }
    fF.prototype = Object.create(f.prototype);
    fF.prototype.constructor = fF;
    fF.prototype.FB = fF;
    fF.GB = {};
    a.b2ParticleHandle = fF;
    fF.prototype.GetIndex = function () {
      return bC(this.EB);
    };
    fF.prototype.InsertAfter = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      cC(c, b);
    };
    fF.prototype.InsertBefore = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      dC(c, b);
    };
    fF.prototype.GetNext = function () {
      return h(eC(this.EB), fF);
    };
    fF.prototype.GetPrevious = function () {
      return h(fC(this.EB), fF);
    };
    fF.prototype.GetTerminator = function () {
      return h(gC(this.EB), fF);
    };
    fF.prototype.Remove = function () {
      return h(hC(this.EB), fF);
    };
    fF.prototype.InList = function () {
      return !!iC(this.EB);
    };
    fF.prototype.IsEmpty = function () {
      return !!jC(this.EB);
    };
    fF.prototype.GetLength = function () {
      return kC(this.EB);
    };
    fF.prototype.__destroy__ = fF.prototype.HB = function () {
      lC(this.EB);
    };
    function gF() {
      this.EB = mC();
      g(gF)[this.EB] = this;
    }
    gF.prototype = Object.create(f.prototype);
    gF.prototype.constructor = gF;
    gF.prototype.FB = gF;
    gF.GB = {};
    a.b2StackAllocator = gF;
    gF.prototype.Allocate = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      return h(nC(c, b), pE);
    };
    gF.prototype.Reallocate = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      return h(oC(d, b, c), pE);
    };
    gF.prototype.Free = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      pC(c, b);
    };
    gF.prototype.__destroy__ = gF.prototype.HB = function () {
      qC(this.EB);
    };
    function hF(b, c) {
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      this.EB = rC(b, c);
      g(hF)[this.EB] = this;
    }
    hF.prototype = Object.create(f.prototype);
    hF.prototype.constructor = hF;
    hF.prototype.FB = hF;
    hF.GB = {};
    a.b2VoronoiDiagram = hF;
    hF.prototype.AddGenerator = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      sC(e, b, c, d);
    };
    hF.prototype.Generate = function (b, c) {
      var d = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      tC(d, b, c);
    };
    hF.prototype.GetNodes = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      uC(c, b);
    };
    hF.prototype.__destroy__ = hF.prototype.HB = function () {
      vC(this.EB);
    };
    function iF() {
      throw "cannot construct a NodeCallback, no constructor in IDL";
    }
    iF.prototype = Object.create(f.prototype);
    iF.prototype.constructor = iF;
    iF.prototype.FB = iF;
    iF.GB = {};
    a.NodeCallback = iF;
    iF.prototype.__destroy__ = iF.prototype.HB = function () {
      wC(this.EB);
    };
    (function () {
      function b() {
        a.b2Shape.e_circle = xC();
        a.b2Shape.e_edge = yC();
        a.b2Shape.e_polygon = zC();
        a.b2Shape.e_chain = AC();
        a.b2Shape.e_typeCount = BC();
        a.b2_staticBody = CC();
        a.b2_kinematicBody = DC();
        a.b2_dynamicBody = EC();
        a.e_unknownJoint = FC();
        a.e_revoluteJoint = GC();
        a.e_prismaticJoint = HC();
        a.e_distanceJoint = IC();
        a.e_pulleyJoint = JC();
        a.e_mouseJoint = KC();
        a.e_gearJoint = LC();
        a.e_wheelJoint = MC();
        a.e_weldJoint = NC();
        a.e_frictionJoint = OC();
        a.e_ropeJoint = PC();
        a.e_motorJoint = QC();
        a.b2ContactFeature.e_vertex = RC();
        a.b2ContactFeature.e_face = SC();
        a.b2Draw.e_shapeBit = TC();
        a.b2Draw.e_jointBit = UC();
        a.b2Draw.e_aabbBit = VC();
        a.b2Draw.e_pairBit = WC();
        a.b2Draw.e_centerOfMassBit = XC();
        a.b2Draw.e_particleBit = YC();
        a.b2Manifold.e_circles = ZC();
        a.b2Manifold.e_faceA = $C();
        a.b2Manifold.e_faceB = aD();
        a.b2_nullState = bD();
        a.b2_addState = cD();
        a.b2_persistState = dD();
        a.b2_removeState = eD();
        a.b2_pbdStretchingModel = fD();
        a.b2_xpbdStretchingModel = gD();
        a.b2_springAngleBendingModel = hD();
        a.b2_pbdAngleBendingModel = iD();
        a.b2_xpbdAngleBendingModel = jD();
        a.b2_pbdDistanceBendingModel = kD();
        a.b2_pbdHeightBendingModel = lD();
        a.b2_waterParticle = mD();
        a.b2_zombieParticle = nD();
        a.b2_wallParticle = oD();
        a.b2_springParticle = pD();
        a.b2_elasticParticle = qD();
        a.b2_viscousParticle = rD();
        a.b2_powderParticle = sD();
        a.b2_tensileParticle = tD();
        a.b2_colorMixingParticle = uD();
        a.b2_destructionListenerParticle = vD();
        a.b2_barrierParticle = wD();
        a.b2_staticPressureParticle = xD();
        a.b2_reactiveParticle = yD();
        a.b2_repulsiveParticle = zD();
        a.b2_fixtureContactListenerParticle = AD();
        a.b2_particleContactListenerParticle = BD();
        a.b2_fixtureContactFilterParticle = CD();
        a.b2_particleContactFilterParticle = DD();
        a.b2_solidParticleGroup = ED();
        a.b2_rigidParticleGroup = FD();
        a.b2_particleGroupCanBeEmpty = GD();
        a.b2_particleGroupWillBeDestroyed = HD();
        a.b2_particleGroupNeedsUpdateDepth = ID();
        a.b2_particleGroupInternalMask = JD();
      }
      Fa ? b() : Ca.unshift(b);
    })();
    R.prototype.get_masses = R.prototype.gF = function () {
      return h(KD(this.EB), n);
    };
    R.prototype.set_masses = R.prototype.DH = function (b) {
      var c = this.EB;
      b && "object" === typeof b && (b = b.EB);
      LD(c, b);
    };
    Object.defineProperty(R.prototype, "masses", {
      get: R.prototype.gF,
      set: R.prototype.DH,
    });
    const Z = (b) => ("object" === typeof b ? b.EB : b);
    a.b2GetPointStates = (b, c, d, e) => {
      PD(Z(b), Z(c), Z(d), Z(e));
    };
    a.b2CollideCircles = (b, c, d, e, q) => {
      QD(Z(b), Z(c), Z(d), Z(e), Z(q));
    };
    a.b2CollidePolygonAndCircle = (b, c, d, e, q) => {
      RD(Z(b), Z(c), Z(d), Z(e), Z(q));
    };
    a.b2CollidePolygons = (b, c, d, e, q) => {
      SD(Z(b), Z(c), Z(d), Z(e), Z(q));
    };
    a.b2CollideEdgeAndCircle = (b, c, d, e, q) => {
      TD(Z(b), Z(c), Z(d), Z(e), Z(q));
    };
    a.b2CollideEdgeAndPolygon = (b, c, d, e, q) => {
      UD(Z(b), Z(c), Z(d), Z(e), Z(q));
    };
    a.b2ClipSegmentToLine = (b, c, d, e, q) => VD(Z(b), Z(c), Z(d), e, q);
    a.b2TestOverlap = (b, c, d, e, q, fa) =>
      void 0 === d ? !!XD(Z(b), Z(c)) : !!WD(Z(b), c, Z(d), e, Z(q), Z(fa));
    a.reifyArray = (b, c, d, e) =>
      Array.from({ length: c }, (q, fa) => h(b + fa * d, e));
    a.pointsToVec2Array = (b) => {
      const c = new Float32Array(2 * b.length);
      for (let e = 0; e < b.length; e++) {
        const { x: q, y: fa } = b[e];
        c[2 * e] = q;
        c[2 * e + 1] = fa;
      }
      const d = a._malloc(c.byteLength);
      ya.set(c, d >> 2);
      return [h(d, n), () => a._free(d)];
    };
    a.tuplesToVec2Array = (b) => {
      const c = new Float32Array(2 * b.length);
      for (let e = 0; e < b.length; e++) {
        const [q, fa] = b[e];
        c[2 * e] = q;
        c[2 * e + 1] = fa;
      }
      const d = a._malloc(c.byteLength);
      ya.set(c, d >> 2);
      return [h(d, n), () => a._free(d)];
    };
    a.toFloatArray = (b) => {
      b = new Float32Array(b);
      const c = a._malloc(b.byteLength);
      ya.set(b, c >> 2);
      return [h(c), () => a._free(c)];
    };
    a.sizeof = (b) => {
      const c = new b();
      b = new b();
      const d = b.EB - c.EB;
      b.HB();
      c.HB();
      return d;
    };
    a.allocateArray = (b, c, d = 1) => {
      c = new ArrayBuffer(c * d);
      const e = a._malloc(c.byteLength);
      wa.set(c, e);
      return [h(e, b), () => a._free(e)];
    };
    a.b2LinearStiffness = (b, c, d, e, q, fa) => {
      YD(Z(b), Z(c), d, e, Z(q), Z(fa));
    };
    a.b2AngularStiffness = (b, c, d, e, q, fa) => {
      ZD(Z(b), Z(c), d, e, Z(q), Z(fa));
    };
    function jF() {
      this.EB = MD();
      g(jF)[this.EB] = this;
    }
    jF.prototype = Object.create(iF.prototype);
    jF.prototype.constructor = jF;
    jF.prototype.FB = jF;
    jF.GB = {};
    a.JSNodeCallback = jF;
    jF.prototype.op_call = function (b, c, d) {
      var e = this.EB;
      b && "object" === typeof b && (b = b.EB);
      c && "object" === typeof c && (c = c.EB);
      d && "object" === typeof d && (d = d.EB);
      ND(e, b, c, d);
    };
    jF.prototype.__destroy__ = jF.prototype.HB = function () {
      OD(this.EB);
    };

    return Box2D.ready;
  };
})();
export default Box2D;
