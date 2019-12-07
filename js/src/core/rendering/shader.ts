import { vec3 } from 'gl-matrix';
import { Texture } from '../utils/texture.utils';
import { genShaderProgram, ShaderProgramType } from '../utils/shader.utils';

export interface ShaderSource {
  vertex: string;
  fragment: string;
}

export default abstract class Shader {
  private readonly shaderProgram: ShaderProgramType;

  constructor(gl: WebGLRenderingContext, source: ShaderSource) {
    this.shaderProgram = genShaderProgram(gl, source.vertex, source.fragment);
  }

  public use(gl: WebGLRenderingContext): void {
    gl.useProgram(this.shaderProgram);
  }

  protected getAttribLocation(gl: WebGLRenderingContext, attribName: string): GLuint | null {
    return this.shaderProgram && gl.getAttribLocation(this.shaderProgram, attribName);
  }

  protected getUniformLocation(gl: WebGLRenderingContext, uniformName: string): WebGLUniformLocation | null {
    return this.shaderProgram && gl.getUniformLocation(this.shaderProgram, uniformName);
  }

  public setUniform1i(gl: WebGLRenderingContext, loc: WebGLUniformLocation | null, val: number): void {
    gl.uniform1i(loc, val);
  }

  public setUniform1f(gl: WebGLRenderingContext, loc: WebGLUniformLocation | null, val: number): void {
    gl.uniform1i(loc, val);
  }

  public setUniform3f(gl: WebGLRenderingContext, loc: WebGLUniformLocation | null, val: vec3): void {
    gl.uniform3fv(loc, val);
  }

  public abstract enableVertexPosition(
    gl: WebGLRenderingContext,
    components: number,
    type: GLuint,
    normalize: GLboolean,
    stride: GLuint,
    offset: GLuint
  ): void;

  public abstract enableVertexNormal(
    gl: WebGLRenderingContext,
    components: number,
    type: GLuint,
    normalize: GLboolean,
    stride: GLuint,
    offset: GLuint
  ): void;

  public abstract enableVertexColor(
    gl: WebGLRenderingContext,
    components: number,
    type: GLuint,
    normalize: GLboolean,
    stride: GLuint,
    offset: GLuint
  ): void;

  public abstract enableVertexUVPosition(
    gl: WebGLRenderingContext,
    components: number,
    type: GLuint,
    normalize: GLboolean,
    stride: GLuint,
    offset: GLuint
  ): void;

  public abstract setProjectionMatrix(gl: WebGLRenderingContext, mat: Float32List): void;

  public abstract setViewMatrix(gl: WebGLRenderingContext, mat: Float32List): void;

  public abstract setModelMatrix(gl: WebGLRenderingContext, mat: Float32List): void;

  public abstract setTexture(gl: WebGLRenderingContext, tex: Texture, texPos?: number): void;
}
