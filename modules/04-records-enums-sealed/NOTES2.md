# Java: Class vs Interface vs Enum vs Record

## Similarities

| Feature | Class | Interface | Enum | Record |
|---------|-------|-----------|------|--------|
| Can have fields | ✅ | ✅ (constants only) | ✅ | ✅ (components only) |
| Can have methods | ✅ | ✅ (default, static, private, abstract) | ✅ | ✅ |
| Can have constructors | ✅ | ❌ | ✅ (private only) | ✅ (canonical) |
| Implements interfaces | ✅ | ✅ (extends multiple) | ✅ | ✅ |
| Can be instantiated | ✅ | ❌ | ✅ (fixed set) | ✅ |
| Static members | ✅ | ✅ | ✅ | ✅ |
| Can be abstract | ✅ | ✅ (implicitly) | ❌ (except constant-specific) | ❌ |
| Can be final | ✅ | ❌ | ✅ (implicitly) | ✅ (implicitly) |
| Abstract methods | ✅ | ✅ (implicitly) | ✅ (only in constant-specific) | ❌ |

---

## Differences

| Feature | Class | Interface | Enum | Record |
|---------|-------|-----------|------|--------|
| Extends | Single class | Multiple interfaces | `java.lang.Enum` | `java.lang.Record` |
| Implements interfaces | ✅ | ✅ (multiple) | ✅ | ✅ |
| Default access | Package-private | Public | Public | Public |
| Can extend class | ✅ | ❌ | ❌ | ❌ |
| Can be extended by | Any (unless final) | Other interfaces | ❌ (implicitly final) | ❌ (implicitly final) |
| Constructor visibility | Any | N/A | Private only | Same as record |
| Instance fields | ✅ Mutable | ❌ (only static final) | ✅ (should be final) | ❌ (components only) |
| `equals()`/`hashCode()`/`toString()` | Manual | N/A | Inherited from Enum | Auto-generated |
| Inheritance | Single class | Multiple interfaces | None | None |
| Abstract methods | ✅ | ✅ (implicitly) | ✅ (only constant-specific) | ❌ |
| Default methods | ❌ | ✅ | ❌ | ❌ |
| Static methods | ✅ | ✅ | ✅ | ✅ |
| Private methods | ✅ | ✅ | ✅ | ✅ |

---

## Key Rules for the Exam

### Class
- Extends ONE class, implements MANY interfaces
- Instance fields are mutable by default
- Must manually override `equals()`, `hashCode()`, `toString()`
- Can have `abstract`, `static`, `private`, `final` methods
- Can be `abstract` or `final`
- Constructors with any visibility
- Can have `static { }` and `{ }` initializers

### Interface
- All methods are `public` by default (except `private`)
- `private` methods are NOT `public`, only accessible within the interface
- Can have `abstract` (implicit), `default`, `static`, and `private` methods
- Cannot be instantiated directly
- No instance fields (only `public static final` constants)
- No constructors
- Can extend MULTIPLE interfaces
- A class can implement MULTIPLE interfaces
- `default` methods can cause conflicts (class must override)
- `static` methods are not inherited

### Enum
- Constants are `public static final` implicitly
- Implicitly `final` (cannot be extended)
- Constructor is ALWAYS `private` (explicit or implicit)
- Extends `java.lang.Enum` (cannot extend anything else)
- Can implement interfaces
- `values()`, `valueOf()`, `ordinal()`, `name()` are auto-generated
- Can have `abstract` methods (each constant must implement them)
- Can have constant-specific class bodies
- Fields SHOULD be `final` (compiler doesn't enforce it, but bad practice)
- `compareTo()` uses declaration order (ordinal)
- Constants must be declared FIRST

### Record
- Implicitly `final` (cannot be extended)
- Extends `java.lang.Record` (cannot extend classes)
- Can implement interfaces
- Components are `private final` implicitly
- Accessors use component name (no `get` prefix): `x()` not `getX()`
- Canonical constructor is auto-generated
- Cannot have additional instance fields
- Can have `static` fields
- `equals()`, `hashCode()`, `toString()` are auto-generated
- Canonical constructor can be overridden (compact form: no parameters)
- Additional constructors can be added (must delegate to canonical)
- Cannot have `abstract` methods
- Cannot have instance initializers `{ }`