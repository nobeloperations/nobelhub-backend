import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ResourceDocumentation(schema: {
  tag: string;
  operations: {
    method: string;
    summary: string;
    description: string;
    responses: Record<number, { status: number; description: string; content?: any }>;
  }[];
}): ClassDecorator & MethodDecorator {
  return (target: any) => {
    schema.operations.forEach(op => {
      ApiTags(schema.tag)(target);
      const methodDecorator = applyDecorators(
        ApiOperation({ summary: op.summary, description: op.description }),
        ...Object.entries(op.responses).map(([status, resp]) =>
          ApiResponse({
            status: Number(status),
            description: resp.description,
            content: resp.content
          })
        )
      );

      const method = target.prototype[op.method];
      if (method) {
        methodDecorator(
          target.prototype,
          op.method,
          Object.getOwnPropertyDescriptor(target.prototype, op.method)
        );
      }
    });
  };
}
